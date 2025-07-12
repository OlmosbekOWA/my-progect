import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListBrands } from "../hooks/queries";
import { Popconfirm, Image, Input, Tooltip, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { FiEye } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { GlobalTable } from "../../../components";
import { useDeleteItem } from "../hooks/mutations";


const ProducListCategory: React.FC = () => {
  const {brand } = useParams<{brand?: string }>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  
  const { mutate: deleteItem, isPending } = useDeleteItem();


  const { data, isLoading, refetch } = useListBrands({
    brand,
    page,
    name: searchTerm, 
  });

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch(); 
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm, page]);

  const handleTableChange: TableProps<any>["onChange"] = (pagination) => {
    setPage(pagination.current || 1);
  };

  const handleView = (id: number) => {
    navigate(`/super-admin-panel/item/${id}`);
  };

  

  const columns: ColumnsType<any> = [
    {
      title: "Rasm",
      dataIndex: "imageUrl",
      render: (src: string) => (
        <Image
          src={`https://produc-api.onrender.com${src}`}
          width={70}
          height={70}
          style={{ objectFit: "contain" }}
        />
      ),
    },
    { title: "ID", dataIndex: "id" },
    { title: "Nomi", dataIndex: "name" },
    { title: "Brend", dataIndex: "brand" },
    { title: "Kategoriya", dataIndex: "category" },
    {
      title: "Xotira", 
      dataIndex: "storage",
      render: (price: string) => price? `${price}`:"Mavjut emas",
    },
    {
      title: "Narxi",
      dataIndex: "sellPrice",
      render: (price: number) => `${price} $`,
    },
    { title: "Soni", dataIndex: "Quantity" },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <Tooltip title="Ko'rish">
          <Button onClick={() => handleView(record.id)}>
            <FiEye size={18} />
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "O'chirish",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Haqiqatan ham o‘chirmoqchimisiz?"
          onConfirm={() => deleteItem(record.id)}
          okText="Ha"
          cancelText="Yo‘q"
          okButtonProps={{ style: { backgroundColor: "red", borderColor: "red" } }}
        >
          <Tooltip title="Mahsulotni o'chirish">
            <Button
              disabled={isPending}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            >
              <MdDeleteOutline size={24} color="red" />
            </Button>
          </Tooltip>
        </Popconfirm>
      ),
    }

  ];


  return (
    <div className="p-6">
      
      <div className="flex items-center gap-4 mb-4 justify-between mr-7">
        <Input
          placeholder="Mahsulot nomi"
          allowClear
          value={searchTerm}
          onChange={(e) => {
            setPage(1); 
            setSearchTerm(e.target.value);
          }}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => navigate(-1)}>
          Orqaga
        </Button>

      </div>

      <GlobalTable
        title={`${brand} mahsulotlari`}
        columns={columns}
        data={data?.data || []}
        total={data?.total}
        loading={isLoading}
        pageSize={10}
        currentPage={page}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProducListCategory;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListCategory } from "../hooks/queries";
import { Image, Input, Tooltip, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { FiEye } from "react-icons/fi";
import { GlobalTable } from "../../../components";

const ProducListCategory: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useListCategory({
    category,
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
  ];


  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
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
      </div>

      <GlobalTable
        title={`${category} mahsulotlari`}
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

import React from "react";
import { useProducts } from "../hooks/queries";
import { GlobalTable } from "../../../components";
import { Image, Input, Space, Tooltip, Button } from "antd";
import { FiEye } from "react-icons/fi"
import { useProductQueryParams } from "../hooks/useProductQueryParams";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

const ProductListPage: React.FC = () => {
  const navigate = useNavigate()

  const {
    page,
    setPage,
    nameFilter,
    setNameFilter,
    searchName,
  } = useProductQueryParams();

  const handleView = (id: number | undefined) => {
    navigate(`/super-admin-panel/${id}`)
  }

  const { data, isLoading, isError } = useProducts({ page, name: searchName });

  if (isError) return <div>Xatolik yuz berdi</div>;

  const columns: ColumnsType<any> = [
    {
      title: "Rasm",
      dataIndex: "imageUrl",
      key: "image",
      render: (src: string) => (
        <Image
          src={`https://produc-api.onrender.com${src}`}
          alt="rasm"
          width={70}
          height={70}
          style={{ objectFit: "contain" }}
        />
      ),
    },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Brend", dataIndex: "brand", key: "brand" },
    { title: "Kategoriya", dataIndex: "category", key: "category" },
    { title: "Xotira", dataIndex: "storage", key: "storage" },
    { title: "Narxi", dataIndex: "sellPrice", key: "sellPrice", render: (totalPrice: number) => `${totalPrice} $` },
    { title: "Soni", dataIndex: "Quantity", key: "Quantity" },
    {
      title: "Action",
      key: "action",
      dataIndex: "action", 
      render: (_: any, record: any) =>
        record?.id ? (
          <Space size="middle">
            <Tooltip title="Ko'rish">
              <Button onClick={() => handleView(record.id.toString())}>
                <FiEye size={18} />
              </Button>
            </Tooltip>
          </Space>
        ) : (
          "-"
        ),
    }
    
  ];

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Mahsulot nomi"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
      </div>

      <GlobalTable
        title="Mahsulotlar jadvali"
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

export default ProductListPage;

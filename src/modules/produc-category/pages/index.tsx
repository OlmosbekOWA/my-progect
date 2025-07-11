import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategoriesWithCount } from "../hooks/queries";
import { GlobalTable } from "../../../components"; 
import type { ColumnsType } from "antd/es/table";
import type { CategoryWithCount } from "../types";
import { Alert, Space, Tooltip, Button} from "antd";
import { FiEye } from "react-icons/fi"

const CategoryTable: React.FC = () => {
    const navigate = useNavigate()
  const { data, isLoading, error } = useCategoriesWithCount();

  const handleView = (category: string | undefined) => {
    navigate(`/super-admin-panel/${category}`)
  }

  const columns: ColumnsType<CategoryWithCount> = [
    {
      title: "Kategoriya nomi",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Mahsulotlar soni",
      dataIndex: "count",
      key: "count",
      render: (count: number) => `${count} ta`,
    },
    {
      title: "Mahsulotlar summasi",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => `${totalPrice} $`,
    },
    {
        title: "Amallar",
        key: "action",
        dataIndex: "action",
        render: (_: any, record) => (
        <Space size="middle">
            <Tooltip title={`${record.category} mahsulotlarini ko‘rish`}>
            <Button onClick={() => handleView(record.category.toString())}>
                <FiEye size={18} />
            </Button>
            </Tooltip>
        </Space>
        ),
    },
  ];

  if (error) {
    return <Alert message="Xatolik yuz berdi" type="error" showIcon />;
  }
  
  return (
    <GlobalTable
      title="Kategoriya bo‘yicha mahsulotlar"
      columns={columns}
      data={data || []}
      loading={isLoading}
      total={data?.length}
      pageSize={10}
      currentPage={1}
    />
  );
};

export default CategoryTable;

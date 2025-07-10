import { useCategoriesWithCount } from "../hooks/queries";
import { Card, List, Typography, Spin } from "antd";

const { Title } = Typography;

const CategoryOverview: React.FC = () => {
  const { data, isLoading, error } = useCategoriesWithCount();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" tip="Yuklanmoqda..." />
      </div>
    );
  }

  if (error) return <p>Xatolik yuz berdi</p>;

  return (
    <Card
      title={<Title level={4}>📦 Kategoriya bo‘yicha mahsulotlar soni</Title>}
      style={{ maxWidth: 600, margin: "30px auto" }}
    >
      <List
        dataSource={data}
        renderItem={(item: { category: string; count: number }) => (
          <List.Item>
            <span style={{ fontWeight: 500 }}>{item.category}</span>
            <span>{item.count} ta mahsulot</span>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CategoryOverview;

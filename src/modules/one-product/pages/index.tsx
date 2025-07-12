import React from "react";
import { useParams } from "react-router-dom";
import { getItemFunc } from "../hooks/queries";
import { Card, Descriptions, Divider, Typography, Image, Badge, Button } from "antd";
import { useNavigate } from "react-router-dom";
import EditItemModal from "./modal";
import { useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../../components";
import { AiTwotoneEdit } from "react-icons/ai";


import { useState } from "react";
import type { Item } from "../types";

const { Title, Text } = Typography;

const ProductDetailPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const loadItems = () => {
    queryClient.invalidateQueries({ queryKey: ["items"] });
  };



  
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const itemId = Number(id);

  const { data, isError, isLoading } = getItemFunc(itemId);

  
  if (isError || !data?.data) return <p></p>;
  if (isLoading) {
    return (
      <Loading />
    );
  }

  const product = data.data;
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>{product.name}</Title>
        <Button 
          onClick={() => { setSelectedItem(product); setIsModalVisible(true); }}>
            <AiTwotoneEdit />
            Ma’lumotni tahrirlash
        </Button>
        <Button type="primary" onClick={() => navigate(-1)}>
            Orqaga
        </Button>
      </div>


      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <Image
          src={`https://produc-api.onrender.com${product.imageUrl}`}
          alt={product.name}
          width={300}
          height={300}
          className="rounded shadow"
          style={{ objectFit: "contain" }}
        />
        <Card title="📦 Mahsulot tafsilotlari" className="flex-1">
          <Descriptions column={1} size="small" labelStyle={{ fontWeight: "bold" }}>
            <Descriptions.Item label=" Mahsulot"><Text strong>{product.name}</Text></Descriptions.Item>
            <Descriptions.Item label=" ID"><Text strong>{product.id}</Text></Descriptions.Item>
            <Descriptions.Item label=" Brend"><Text strong>{product.brand}</Text></Descriptions.Item>
            <Descriptions.Item label=" Kategoriya"><Text strong>{product.category}</Text></Descriptions.Item>
            <Descriptions.Item label=" Xotira"><Text strong>{product.storage}</Text></Descriptions.Item>
            <Descriptions.Item label=" Narxi"><Text strong>{product.sellPrice} $</Text></Descriptions.Item>
            <Descriptions.Item label=" Asosiy soni"><Text strong>{product.Quantity} dona</Text></Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <Divider />

      
      {product.specifications && (
        <Card title="⚙️ Texnik xususiyatlar" className="mb-6">
          <Descriptions column={2} labelStyle={{ fontWeight: "bold" }}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <Descriptions.Item label={key.toUpperCase()} key={key}>
                <Text strong>{String(value)}</Text>
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Card>
      )}

      
      {product.stock && (
        <Card title=" Ombor va kafolat ma'lumotlari">
          <Descriptions column={2} labelStyle={{ fontWeight: "bold" }}>
            <Descriptions.Item label="Qolgan soni">
              <Text strong>{product.stock.quantity} dona</Text>
            </Descriptions.Item>
            <Descriptions.Item label=" Kafolat">
              <Text strong>{product.stock.warranty}</Text>
            </Descriptions.Item>
            <Descriptions.Item label=" Reyting">
              <Badge color="gold" text={`${product.stock.rating} / 5`} />
            </Descriptions.Item>
            <Descriptions.Item label=" Sharhlar soni">
              <Text strong>{product.stock.reviewsCount} ta</Text>
            </Descriptions.Item>
            <Descriptions.Item label=" Yangi mahsulotmi">
              <Badge
                status={product.stock.isFeatured ? "success" : "default"}
                text={product.stock.isFeatured ? "Ha" : "Yo‘q"}
              />
            </Descriptions.Item>
            <Descriptions.Item label=" Qo‘shilgan sana">
              <Text strong>{product.stock.addedDate}</Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        
      )}
      
       

      <EditItemModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        item={selectedItem}
        onSave={loadItems}
      />

    </div>

  );
};

export default ProductDetailPage;

// src/pages/AddProductPage.tsx
import React, { useState } from "react";
import {
  Form, Input, Button, Upload, message, Row, Col, Space
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useCreateItems } from "../hooks/mutations";
import type { ItemFormValues } from "../types";

const AddProductPage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutateAsync, isPending } = useCreateItems();

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isImage || !isLt2M) {
      return Upload.LIST_IGNORE;
    }
    return false;
  };

    const onFinish = async (vals: ItemFormValues) => {
        const formData = new FormData();

        Object.entries({
            name: vals.name,
            brand: vals.brand,
            category: vals.category,
            storage: vals.storage,
            sellPrice: String(vals.sellPrice),
            Quantity: String(vals.Quantity),
        }).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
            formData.append(key, value);
            }
        });

        formData.append("specifications", JSON.stringify(vals.specifications || {}));
        formData.append("stock", JSON.stringify(vals.stock || {}));

        if (fileList[0]?.originFileObj) {
            formData.append("image", fileList[0].originFileObj);
        }

        try {
            await mutateAsync(formData);
            message.success("Mahsulot muvaffaqiyatli qo‘shildi");

            
            form.resetFields();   
            setFileList([]);      

            
        } catch (err) {
            message.error("Xatolik yuz berdi");
        }
    };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
      <h1 style={{ textAlign: "center" }}>Add New Product</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {["name", "brand", "category", "storage"].map((field) => (
            <Col span={12} key={field}>
              <Form.Item name={field} label={field} rules={[{ required: field !== "storage" }]}>
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="sellPrice" label="Price ($)" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Quantity" label="Quantity" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        {/* Specifications */}
        <Row gutter={16}>
          {[
            ["ram", "RAM"], ["processor", "Processor"], ["battery", "Battery"],
            ["screenSize", "Screen Size"], ["os", "Operating System"],
            ["camera", "Camera"], ["sim", "SIM"], ["weight", "Weight"], ["color", "Color"]
          ].map(([key, label]) => (
            <Col span={12} key={key}>
              <Form.Item name={["specifications", key]} label={label}>
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        {/* Stock */}
        <Row gutter={16}>
          {[
            ["quantity", "Remaining Quantity"], ["warranty", "Warranty"],
            ["rating", "Rating"], ["reviewsCount", "Reviews Count"],
            ["isFeatured", "Is Featured"], ["addedDate", "Added Date"]
          ].map(([key, label]) => (
            <Col span={12} key={key}>
              <Form.Item name={["stock", key]} label={label}>
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item label="Image">
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
            accept="image/*"
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok"), 0)}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "end" }}>
            <Button htmlType="reset" onClick={() => form.resetFields()}>Reset</Button>
            <Button type="primary" htmlType="submit" loading={isPending}>Submit</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;

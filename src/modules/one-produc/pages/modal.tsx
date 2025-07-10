import React, { useEffect, useState } from "react";
import {
  Modal, Form, Input, Button, Upload, message,
  Row, Col, Space
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { useUpdateItem } from "../hooks/mutations";
import type { EditItemModalProps } from "../types";


const EditItemModal: React.FC<EditItemModalProps> = ({
  visible, onCancel, item, onSave
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutateAsync, isPending } = useUpdateItem();

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        brand: item.brand,
        category: item.category,
        storage: item.storage,
        sellPrice: item.sellPrice,
        Quantity: item.Quantity,
        specifications: item.specifications || {},
        stock: item.stock || {}
      });
      setFileList(item.imageUrl ? [{
        uid: "-1",
        name: item.imageUrl.split("/").pop() || "",
        status: "done",
        url: `https://produc-api.onrender.com${item.imageUrl}`
      }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [item, form]);

  const beforeUpload = (file: RcFile) => {
    const ok = file.type.startsWith("image/") && file.size / 1024 / 1024 < 2;
    if (!ok) message.error("Rasm 2MB dan kichik bo‘lishi kerak!");
    return ok || Upload.LIST_IGNORE;
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) =>
    setFileList(fileList);

  const onFinish = async (vals: any) => {
    if (!item) return;
    const formData = new FormData();
    Object.entries({
      name: vals.name,
      brand: vals.brand,
      category: vals.category,
      storage: vals.storage,
      sellPrice: String(vals.sellPrice),
      Quantity: String(vals.Quantity)
    }).forEach(([k, v]) => formData.append(k, v as string));
    formData.append("specifications", JSON.stringify(vals.specifications || {}));
    formData.append("stock", JSON.stringify(vals.stock || {}));
    if (fileList[0]?.originFileObj) formData.append("image", fileList[0].originFileObj);
    try {
      await mutateAsync({ id: item.id, data: formData });
      message.success("Yangilandi");
      onCancel();
      onSave();
    } catch {
      message.error("Yangilashda xato yuz berdi");
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={720}
      className="custom-modal"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        
        <Row gutter={16}>
          {["name","brand","category","storage"].map(f => (
            <Col span={12} key={f}>
              <Form.Item name={f} label={f.charAt(0).toUpperCase()+f.slice(1)} rules={[{ required: f !== "storage" }]}>
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="sellPrice" label="Narxi ($)" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Quantity" label="Soni" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        
        <Row gutter={16}>
          {[
            ["ram","RAM"],["processor","Processor"],["battery","Battery"],
            ["screenSize","Ekran o‘lchami"],["os","Operatsion tizim"],
            ["camera","Kamera"],["sim","SIM"],["weight","Og‘irlik"],
            ["color","Rang"]
          ].map(([k,label]) => (
            <Col span={12} key={k}>
              <Form.Item name={["specifications",k]} label={label}>
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        
        <Row gutter={16}>
          {[
            ["quantity","Qolgan soni"],["warranty","Kafolat"],
            ["rating","Reyting"],["reviewsCount","Sharhlar soni"],
            ["isFeatured","Tanlanganmi"],["addedDate","Qo‘shilgan sana"]
          ].map(([k,label]) => (
            <Col span={12} key={k}>
              <Form.Item name={["stock",k]} label={label}>
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>

        
        <Form.Item>
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            maxCount={1}
            accept="image/*"
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok"),0)}
          >
            <Button icon={<UploadOutlined />}>Rasm Tanlash</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Button onClick={onCancel}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Saqlash
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditItemModal;

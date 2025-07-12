import { Input, Form, Button, Typography } from "antd";
import { useLogin } from "../hooks/mutation";
import { useNavigate } from "react-router-dom";
import type { LoginInput } from "../types";


const { Title } = Typography;

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  

  const { mutate, isPending } = useLogin(
  () => {
    navigate("/super-admin-panel");
  },
  () => {
    form.setFields([
      {
        name: "username",
        errors: ["Login yoki parol noto‘g‘ri"],
      },
      {
        name: "password",
        errors: [""],
      },
    ]);
  }
);

const onFinish = (values: LoginInput) => {
  mutate(values);
};

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <Title level={3} className="text-center mb-6">
          Login to Dashboard
        </Title>

        <Form
          form={form}
          name="sign_in"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              size="large"
              placeholder="Enter username"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isPending}
              className="bg-[#050556] hover:bg-[#1e1e88] text-white font-semibold rounded-md mt-2"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;

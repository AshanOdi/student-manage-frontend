import { Button, Card, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await api.post("/auth/login", values);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      message.success("Login successful");

      navigate("/");
    } catch (error) {
      message.error("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card
        title="Student Dashboard Login"
        className="w-[400px] shadow-lg rounded-xl"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

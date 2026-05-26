import { Layout, Menu, Button } from "antd";

import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout() {
  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <Layout className="min-h-screen">
      <Sider>
        <div className="text-white text-center p-4 text-lg font-bold">
          Student CMS
        </div>

        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="/students" icon={<TeamOutlined />}>
            <Link to="/students">Students</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header className="bg-white flex justify-end items-center px-6">
          <Button danger icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        </Header>

        <Content className="p-6 bg-gray-100">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

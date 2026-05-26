import { Layout, Menu, Button, Avatar } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  BookOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  FileTextOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

// Define menu items per role
const menuConfig = {
  admin: [
    { key: "/", icon: <DashboardOutlined />, label: "Dashboard", to: "/" },
    {
      key: "/students",
      icon: <TeamOutlined />,
      label: "Students",
      to: "/students",
    },
    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Reports",
      to: "/reports",
    },
    {
      key: "/courses",
      icon: <BookOutlined />,
      label: "Courses",
      to: "/courses",
    },
    {
      key: "/schedule",
      icon: <CalendarOutlined />,
      label: "Schedule",
      to: "/schedule",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      to: "/settings",
    },
  ],
  student: [
    { key: "/", icon: <DashboardOutlined />, label: "Dashboard", to: "/" },
    {
      key: "/my-courses",
      icon: <BookOutlined />,
      label: "My Courses",
      to: "/my-courses",
    },
    {
      key: "/schedule",
      icon: <CalendarOutlined />,
      label: "Schedule",
      to: "/schedule",
    },
    {
      key: "/grades",
      icon: <TrophyOutlined />,
      label: "Grades",
      to: "/grades",
    },
    {
      key: "/assignments",
      icon: <FileTextOutlined />,
      label: "Assignments",
      to: "/assignments",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
      to: "/profile",
    },
  ],
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse user from localStorage
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const role = user?.role || "student"; // fallback to student
  const menuItems =
    menuConfig[role as keyof typeof menuConfig] ?? menuConfig.student;

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
          {menuItems.map(({ key, icon, label, to }) => (
            <Menu.Item key={key} icon={icon}>
              <Link to={to}>{label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Header className="bg-white flex justify-between items-center px-6">
          {/* User info on the left */}
          <div className="flex items-center gap-2">
            <Avatar icon={<UserOutlined />} />
            <span className="font-medium text-gray-700">
              {user?.name || "User"}
            </span>
          </div>

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

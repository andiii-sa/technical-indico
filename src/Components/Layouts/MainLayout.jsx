import { LogoutOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";

import { Link, Outlet, useLocation } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const MainLayout = () => {
  const getPath = useLocation().pathname;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user, setClear } = useUserStore();

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Link
          to={"/"}
          className={`flex items-center rounded-lg gap-3 mx-1 my-2 px-6 py-2 text-white hover:text-white hover:bg-blue-600 ${
            getPath === "/" ? "bg-blue-600" : ""
          }`}
        >
          <TeamOutlined />
          <span>Inventory Management</span>
        </Link>
        <Link
          to={"/"}
          className={`flex items-center rounded-lg gap-3 mx-1 my-2 px-6 py-2 text-white hover:text-white hover:bg-blue-600 ${
            getPath === "/recipe" ? "bg-blue-600" : ""
          }`}
        >
          <ShopOutlined />
          <span>Recipe</span>
        </Link>
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className="px-6 flex justify-between items-center"
        >
          <span>Hello, {user}</span>
          <Button
            className="h-fit py-2"
            color="danger"
            variant="solid"
            onClick={() => setClear()}
          >
            <LogoutOutlined />
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          andiii-sa ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

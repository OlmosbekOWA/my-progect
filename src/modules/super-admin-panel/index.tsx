
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, Popconfirm, theme } from "antd";
import { NavLink, useLocation, Outlet, useNavigate } from "react-router-dom";
import { adminRights } from "../../router/routes"
import { logout, getAccessTocen } from "../../utils/token-serviace";
import { useState,useEffect } from "react";



const { Header, Sider, Content } = Layout;
const { Item } = Menu;

const App = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const getToken = getAccessTocen()
  console.log(null === null);

  useEffect(() => {
    if (getToken == null) {
      navigate("/"); 
    }
  }, [getToken, navigate]);
;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        >
        <div className="demo-logo-vertical" />
        <div
            style={{
                display: "flex",
                paddingLeft: "1rem",     
                alignItems: "center",    
                padding: "1rem",         
                gap: "0.5rem",           
                fontWeight: "600",       
                marginBottom: "0.5rem",  
            }}
        >
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
          {adminRights
            .filter((item) => item.showInSidebar) 
            .map((item) => (
              <Item
                key={item.path}
                icon={item.icon}
                disabled={item.disabled} 
                style={{
                  opacity: item.disabled ? 0.5 : 1,
                  pointerEvents: item.disabled ? "none" : "auto",
                  cursor: item.disabled ? "not-allowed" : "pointer",
                }}
              >
                <NavLink
                  to={item.disabled ? "#" : item.path}
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    pointerEvents: item.disabled ? "none" : "auto",
                    color: item.disabled ? "#aaa" : "inherit",
                  }}
                  onClick={(e) => {
                    if (item.disabled) e.preventDefault();
                  }}
                >
                  {item.label}
                </NavLink>
              </Item>
            ))}
        </Menu>

      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: 16,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Popconfirm
            title="Are you sure you want to logout?"
            onConfirm={handleLogout}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: {
                backgroundColor: "green",
                borderColor: "green",
              },
            }}
            cancelButtonProps={{
              style: {
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              },
            }}
          >
            <Button
              type="text"
              icon={<LoginOutlined />}
              style={{
                fontSize: "18px",
                width: 84,
                height: 44,
                fontFamily: "monospace",
              }}
            >
              Logout
            </Button>
          </Popconfirm>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "calc(100vh - 112px)", // 64 header + 24*2 margin
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

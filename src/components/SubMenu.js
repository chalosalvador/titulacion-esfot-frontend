import React, { useState } from "react";
import { Button, Dropdown, Menu, PageHeader, Typography } from "antd";
import {
  BellOutlined,
  HomeOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";

const { Title } = Typography;
const SubMenu = () => {
  let location = useLocation();
  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });

  const { currentUser, isCheckingAuth, isAuthenticated } = useAuth();

  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  const handleClick = (e) => {
    console.log("click ", e);
    setMenuState({
      ...menuState,
      current: e.key,
    });
  };
  const userMenu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="password">Cambiar clave</Menu.Item>
      <Menu.Item key={Routes.LOGOUT}>
        <Link to={Routes.LOGOUT} className="logout-link">
          {isCheckingAuth ? (
            <LoadingOutlined />
          ) : (
            <>
              <LogoutOutlined /> Cerrar sesión
            </>
          )}
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <PageHeader
      className="inner-menu"
      // title={
      // <Title
      //   level={3}
      //   style={{
      //     color: "#034c70",
      //   }}
      // >
      //   Panel Principal:
      // </Title>
      // }
      extra={[
        <Button key="home" type="text" style={{ color: "#034c70" }}>
          <Link to={Routes.HOME}>
            <HomeOutlined />
          </Link>
        </Button>,
        // <Button
        //     key="notifications"
        //     type="text"
        //     style={{color: "#034c70"}}
        //     icon={<BellOutlined/>}
        // />,
        <Dropdown key="user-menu" overlay={userMenu} placement="bottomLeft">
          <Button
            type="text"
            style={{ color: "#034c70" }}
            icon={<UserOutlined />}
          >
            {currentUser && currentUser.name}
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default SubMenu;

import React from "react";
import { Layout } from "antd";
import { useAuth } from "../providers/Auth";
import SubMenu from "./SubMenu";
import SiderAdministrative from './SiderAdministrative';
import SiderTeacher from "./SiderTeacher";
import SiderSecretary from "./SiderSecretary";
import SiderStudent from "./SiderStudent";

const { Content } = Layout;
const SubLayout = ({ children }) => {
  const { currentUser } = useAuth();

  const getSider = () => {
    let sider;

    switch (currentUser.role) {
      case "ROLE_TEACHER":
        sider = <SiderTeacher />;
        break;
      case "ROLE_SECRETARY":
        sider = <SiderSecretary />;
        break;
      case "ROLE_STUDENT":
        sider = <SiderStudent />;
        break;
      case "ROLE_ADMIN":
        sider = <SiderAdministrative />;
        break;
      default:
        sider = null;
        break;
    }

    return sider;
  };

  return (
    <Layout>
      {currentUser && getSider()}
      <Layout>
        <SubMenu />
        <Content style={{ padding: 50 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SubLayout;

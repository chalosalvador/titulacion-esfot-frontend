import { Col, Layout, Menu, Row, Typography } from "antd";
import React, { useState } from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import { useProjectsList } from "../data/useProjectsList";
import ShowError from "./ShowError";
import Loading from "./Loading";
import { LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import Routes from "../constants/routes";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import PlanReview from "./PlansReviewCollapse";
import ProjectsListStatus from "./ProjectsListStatus";

const { Content, Sider } = Layout;
const { Title } = Typography;

const TeacherPanel = () => {
  let location = useLocation();
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const { teachersProjects, isLoading, isError } = useProjectsList();

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });
  const handleClick = (e) => {
    console.log("click ", e);
    setMenuState({
      ...menuState,
      current: e.key,
    });
  };
  //
  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  const userMenu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="password">Cambiar clave</Menu.Item>
      <Menu.Item key={Routes.LOGIN}>
        <Link to={Routes.LOGOUT} className="logout-link">
          {isCheckingAuth ? (
            <LoadingOutlined />
          ) : (
            <>
              <LogoutOutlined /> Cerrar sesión{" "}
            </>
          )}
        </Link>
      </Menu.Item>
    </Menu>
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  console.log(teachersProjects);

  // console.log("Pilas",getDataSource());

  return (
    <>
      <Row>
        <Col>
          <Title
            level={3}
            style={{
              color: "#034c70",
              marginLeft: -30,
            }}
          >
            Dirección:
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title level={3} style={{ color: "#034c70" }}>
            Planes y proyectos de titulación
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProjectsListStatus />
        </Col>
      </Row>
    </>
  );
};

export default TeacherPanel;

import React from "react";
import { Card, Layout, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

const SiderAdministrative = () => {
  return (
    <Sider
      theme="light"
      width={300}
      style={{
        backgroundColor: "#dddddd",
        padding: 40,
      }}
    >
      <Title level={3} style={{ color: "#034c70" }}>
        Director
      </Title>
      <Card
        className={"statistics-content"}
        title="Proyectos sin tribunal"
        bordered={false}
      >
        <Title level={2}>10</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Proyectos con defensa asignada"
        bordered={false}
      >
        <Title level={2}>4</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Proyectos en curso"
        bordered={false}
      >
        <Title level={2}>4</Title>
      </Card>
    </Sider>
  );
};

export default SiderAdministrative;

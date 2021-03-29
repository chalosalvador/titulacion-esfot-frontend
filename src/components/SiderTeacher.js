import React from "react";
import { Card, Layout, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

const SiderTeacher = () => {
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
        title="Tesis dirigidas"
        bordered={false}
      >
        <Title level={2}>10</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Planes por revisar"
        bordered={false}
      >
        <Title level={2}>2</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Proyectos por revisar"
        bordered={false}
      >
        <Title level={2}>2</Title>
      </Card>

      <Title level={3} style={{ color: "#034c70" }}>
        Jurado
      </Title>

      <Card
        className={"statistics-content"}
        title="Proyectos por revisar"
        bordered={false}
      >
        <Title level={2}>10</Title>
      </Card>
    </Sider>
  );
};

export default SiderTeacher;

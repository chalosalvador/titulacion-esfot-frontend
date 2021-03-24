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
        Planes
      </Title>
      <Card
        className={"statistics-content"}
        title="Por revisar para ingreso a revisión de comisión"
        bordered={false}
      >
        <Title level={2}>10</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Por registrar en SAEW"
        bordered={false}
      >
        <Title level={2}>5</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Planes por revisar en comisión"
        bordered={false}
      >
        <Title level={2}>12</Title>
      </Card>

      <Title level={3} style={{ color: "#034c70", marginTop: 20 }}>
        Proyectos
      </Title>

      <Card
        className={"statistics-content"}
        title="Por revisar para asignar tribunal"
        bordered={false}
      >
        <Title level={2}>2</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Por revisar para asignar fecha de grado oral"
        bordered={false}
      >
        <Title level={2}>3</Title>
      </Card>

      <Card
        className={"statistics-content"}
        title="Por enviar carpeta a Vicerrectorado"
        bordered={false}
      >
        <Title level={2}>4</Title>
      </Card>
    </Sider>
  );
};

export default SiderTeacher;

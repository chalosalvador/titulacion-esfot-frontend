import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  message,
  Button,
  Select,
  Col,
  Row,
  Alert,
  Switch,
  Table,
} from "antd";
import { useTeachers } from "../data/useTeachers";
import { useCareersList } from "../data/useCareersList";
import Loading from "./Loading";
import ShowError from "./ShowError";
import API from "../data";
import { Option } from "antd/es/mentions";
import "../styles/schedule-form.css";

const { Item } = Form;

const SecretaryAddTeacherForm = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const { careers, isLoading, isError } = useCareersList();
  const { mutate } = useTeachers();
  const [hoursSelected, setHoursSelected] = useState(0);
  const [scheduleEdited, setScheduleEdited] = useState(false);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const columns = [
    {
      title: "Hora",
      dataIndex: "hour",
      key: "hour",
      width: 150,
    },
    {
      title: "Lunes",
      dataIndex: "monday",
      key: "monday",
      width: 200,
    },
    {
      title: "Martes",
      dataIndex: "tuesday",
      key: "tuesday",
      width: 200,
    },
    {
      title: "Miércoles",
      dataIndex: "wednesday",
      key: "wednesday",
      width: 200,
    },
    {
      title: "Jueves",
      dataIndex: "thursday",
      key: "thursday",
      width: 200,
    },
    {
      title: "Viernes",
      dataIndex: "friday",
      key: "friday",
      width: 200,
    },
  ];

  const handleScheduleChange = (checked) => {
    setScheduleEdited(true);
    if (checked) {
      setHoursSelected(hoursSelected + 1);
    } else {
      setHoursSelected(hoursSelected - 1);
    }
  };

  const data = [];
  for (let i = 7; i < 20; i++) {
    let daysByHour = {};
    days.forEach((day) => {
      daysByHour[day] = (
        <Item name={[day, i]}>
          <Switch
            initialValue={false}
            valuePropName="checked"
            className="schedule-form__switch"
            onChange={handleScheduleChange}
          />
        </Item>
      );
    });

    data.push({
      key: i,
      hour: `${i}h00 - ${i + 1}h00`,
      ...daysByHour,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  // Funcion de guardado de nuevo profesor
  const formSuccess = async (datos) => {
    console.log("Datos recibidos del form", datos);
    const {
      name,
      last_name,
      email,
      career_id,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
    } = datos;
    const schedule = {
      monday: {
        ...monday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      tuesday: {
        ...tuesday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      wednesday: {
        ...wednesday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      thursday: {
        ...thursday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
      friday: {
        ...friday.map((item) => {
          if (item === undefined) {
            return false;
          }
          return item;
        }),
      },
    };
    const textSchedule = JSON.stringify(schedule);

    setLoading(true);
    const teacher = {
      name: name,
      last_name: last_name,
      email: email,
      career_id: career_id,
      schedule: textSchedule,
    };
    try {
      await API.post("/teachers/", teacher);
      console.log("Profesor creado exitosamente: ", teacher);
      message.success("Cambios guardados correctamente!");
      setLoading(false);
      mutate();
      closeModal();
    } catch (e) {
      message.error(e.message);
      console.log("error", e);
      setLoading(false);
    }
  };

  const formFailed = (error) => {
    console.log("Error: ", error);
  };

  return (
    <div>
      <div>
        <Form
          onFinish={formSuccess}
          onFinishFailed={formFailed}
          className="schedule-form"
        >
          <Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del profesor",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Apellido"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el apellido del profesor",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Carrera"
            name="career_id"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el id de la carrera",
              },
            ]}
          >
            <Select
              placeholder="Seleccione"
              style={{ width: 300 }}
              loading={isLoading}
            >
              {careers &&
                careers.map((career, index) => (
                  <Option value={career.id} key={index}>
                    {career.name}
                  </Option>
                ))}
            </Select>
          </Item>
          <Item
            label="Correo electrónico"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el email del profesor",
              },
            ]}
          >
            <Input />
          </Item>
          <Row type="flex" justify="center">
            <Col span={40}>
              <Table
                pagination={false}
                columns={columns}
                className="schedule-form__table"
                dataSource={data}
                size={"large"}
                bordered
                title={() =>
                  hoursSelected < 1 ? (
                    <Alert
                      message="Selecciona las horas en las que el profesor está disponible"
                      banner
                      type="error"
                    />
                  ) : (
                    <Alert
                      message="Asegúrate de que el horario esté ingresado correctamente"
                      banner
                      type="info"
                    />
                  )
                }
              />
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                >
                  Guardar
                </Button>
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SecretaryAddTeacherForm;

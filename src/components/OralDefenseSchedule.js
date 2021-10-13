import React, { useState } from "react";
import {
  Alert,
  Col,
  Divider,
  Row,
  Select,
  Table,
  DatePicker,
  TimePicker,
  Button,
  message,
} from "antd";
import { useTeachers } from "../data/useTeachers";
import Loading from "./Loading";
import ShowError from "./ShowError";
import API from "../data";
import { CheckOutlined, FieldTimeOutlined } from "@ant-design/icons";

const { Option } = Select;

const OralDefenseSchedule = (project) => {
  console.log("props", project);

  let teachersSchedules = {};
  let teachersNameOptions = [];

  const [schedulesData, setSchedulesData] = useState([]);
  const { teachers, isLoading, isError } = useTeachers();
  const [teachersSelected, setTeachersSelected] = useState(false);
  const [daySelected, setDaySelected] = useState(true);
  const [hourSelected, setHourSelected] = useState(false);

  const [oralDefenseDay, setOralDefenseDay] = useState();
  const [oralDefenseTime, setOralDefenseTime] = useState();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  const getTeachersData = teachers.map((teacher, index) => {
    const scheduleData = JSON.parse(teacher.schedule);

    // console.log("Horarios de la base", scheduleData);

    teachersSchedules[teacher.id] = {
      name: `${teacher.name}`,
      ...scheduleData,
    };

    teachersNameOptions.push(
      <Option key={teacher.id}>{`${teacher.name}`}</Option>
    );

    return {
      key: index,
      id: teacher.id,
      originalData: teacher,
      name: teacher.name,
      career: teacher.career,
      email: teacher.email,
      schedule: teacher.schedule,
    };
  });
  console.log("Profesores", getTeachersData);

  const handleScheduleChange = (selectedTeachers) => {
    console.log("selectedTeachers", selectedTeachers);
    console.log("teachersSchedules[ selectedTeachers ]", teachersSchedules[15]);
    const d = [];

    if (selectedTeachers.length > 0) {
      for (let hour = 7; hour < 20; hour++) {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

        let daysByHour = {};
        days.forEach((day) => {
          selectedTeachers.forEach((teacherId) => {
            console.log("daysByHour [day]", daysByHour[day]);
            daysByHour[day] =
              daysByHour[day] !== undefined
                ? daysByHour[day] && teachersSchedules[teacherId][day][hour]
                : teachersSchedules[teacherId][day][hour];
          });
        });

        console.log("DAYS BY HOUR", daysByHour);

        d.push({
          key: hour,
          hour: `${hour}h00 - ${hour + 1}h00`,
          ...daysByHour,
        });
      }
    }
    console.log("HORARIOS CRUZADOS DE PROFESORES", d);
    setSchedulesData(d);
    setTeachersSelected(true);
    console.log("data", schedulesData);
  };

  const cellColorRender = (data) =>
    data === true
      ? {
          props: {
            style: { background: "#52c41a" },
          },
        }
      : {
          props: {
            style: { background: "#fafafa" },
          },
        };

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
      render: cellColorRender,
      width: 200,
    },
    {
      title: "Martes",
      dataIndex: "tuesday",
      key: "tuesday",
      render: cellColorRender,
      width: 200,
    },
    {
      title: "Miércoles",
      dataIndex: "wednesday",
      key: "wednesday",
      render: cellColorRender,
      width: 200,
    },
    {
      title: "Jueves",
      dataIndex: "thursday",
      key: "thursday",
      render: cellColorRender,
      width: 200,
    },
    {
      title: "Viernes",
      dataIndex: "friday",
      key: "friday",
      render: cellColorRender,
      width: 200,
    },
  ];

  const onChangeDay = (date, dateString) => {
    setOralDefenseDay(dateString);
    console.log("Fecha", oralDefenseDay);
    setDaySelected(false);
  };

  const onChangeHour = (time, timeString) => {
    setOralDefenseTime(timeString);
    console.log("Hora", oralDefenseTime);
    setHourSelected(true);
  };

  const saveTempDate = () => {
    const oralDefenseDate = oralDefenseDay + " " + oralDefenseTime;
    console.log("Datos antes de armar", project.project, oralDefenseDate);
    try {
      const schedule = {
        tribunalSchedule: oralDefenseDate,
        project_id: project.project,
      };
      console.log("datos que se envian al API", schedule);
      API.put("/juries/assignSchedule", schedule);
      message.success("Fecha tentativa de defensa guardada exitosamente");
    } catch (e) {
      message.error("No se pudo guardar los datos correctamente");
    }
  };

  const saveFinalDate = async () => {
    const oralDefenseDate = oralDefenseDay + " " + oralDefenseTime;
    console.log("Datos antes de armar", project.project, oralDefenseDate);
    try {
      const schedule = {
        tribunalSchedule: oralDefenseDate,
        project_id: project.project,
      };
      console.log("datos que se envian al API", schedule);
      await API.put("/juries/assignSchedule", schedule);
      await API.post(`/projects/${project.project}/date-defense-assigned`);
      message.success("Fecha definitiva de defensa guardada exitosamente");
    } catch (e) {
      message.error("No se pudo guardar los datos correctamente");
    }
  };

  return (
    <div>
      <Row type="flex" justify="center">
        <Col span={20}>
          <h1>Seleccione los profesores:</h1>
        </Col>
      </Row>

      <Row type="flex" justify="center">
        <Col span={12} offset={1}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            size={"large"}
            onChange={handleScheduleChange}
            placeholder={"Seleccione o escriba los nombres de los profesores"}
            showArrow={true}
            // filterOption={ ( input, option ) =>
            //     option.props.children.toLowerCase().indexOf( input.toLowerCase() ) >= 0
            // }
          >
            {teachersNameOptions}
          </Select>
        </Col>
      </Row>

      <Divider />

      <Row type="flex" justify="center">
        <Col span={12}>
          <Alert
            message="Horas en que todos los profesores seleccionados están disponibles"
            type="info"
            showIcon
            banner
          />
        </Col>
      </Row>

      <Row type="flex" justify="center">
        <Col span={20}>
          <Table
            pagination={false}
            columns={columns}
            dataSource={schedulesData}
            size={"middle"}
            bordered
          />
        </Col>
      </Row>

      <Row type="flex" justify="center">
        <Col span={12}>
          <Alert
            message="Seleccione la fecha y la hora para la defensa oral"
            type="info"
            showIcon
            banner
          />
        </Col>
      </Row>

      <Row
        type="flex"
        justify="center"
        style={{ paddingTop: 20, paddingBottom: 50 }}
      >
        <Col span={10} style={{ paddingLeft: 330 }}>
          <DatePicker placeholder={"Seleccionar día"} onChange={onChangeDay} />
        </Col>
        <Col span={10}>
          <TimePicker
            placeholder={"Seleccionar hora"}
            onChange={onChangeHour}
          />
        </Col>
      </Row>

      <Row type="flex" justify="center">
        <Col span={10} style={{ paddingLeft: 280 }}>
          <Button onClick={saveTempDate} disabled={daySelected}>
            <FieldTimeOutlined />
            Enviar fecha tentativa
          </Button>
        </Col>
        <Col span={10} style={{ paddingLeft: 20 }}>
          <Button
            onClick={saveFinalDate}
            style={{ backgroundColor: "#034c70", color: "white" }}
            disabled={daySelected}
          >
            <CheckOutlined />
            Confirmar fecha definitiva
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default OralDefenseSchedule;

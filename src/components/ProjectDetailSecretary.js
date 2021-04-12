import React, { useState } from "react";
import {
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Row,
  Switch,
  Typography,
} from "antd";
import { usePlanContent } from "../data/usePlan";
import API from "../data";

const { Title } = Typography;
const { Panel } = Collapse;

const ProjectDetailSecretary = ({ id }) => {
  console.log("id", id);

  const [approveMethodology, setApproveMethodology] = useState(null);
  const [approveSubject, setApproveSubject] = useState(null);
  const [approveAll, setApproveAll] = useState(null);
  const [approve80, setApprove80] = useState(null);
  const [checkSAEW, setCheckSAEW] = useState(null);

  const { plan, isLoading, isError } = usePlanContent(id);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  console.log("plan", plan, isError);

  const onFinish = (values) => {
    console.log(values);
  };
  const callback = (key) => {
    console.log(key);
  };
  const onChange = async (e, option) => {
    console.log(`checked = ${e.target.checked}`);
    let planData = {};
    switch (option) {
      case "san_curriculum_1":
        setApproveMethodology(true);
        if (e.target.checked && approve80) {
          planData = {
            ...plan,
            status: "san_curriculum_1",
          };
        }
        break;
      case "san_curriculum_2":
        setApproveSubject(true);
        if (e.target.checked && approveAll && checkSAEW) {
          planData = {
            ...plan,
            status: "san_curriculum_2",
          };
        }
        break;
      case "san_curriculum_2_2":
        setApproveAll(true);
        if (e.target.checked && approveSubject && checkSAEW) {
          planData = {
            ...plan,
            status: "san_curriculum_2",
          };
        }
        break;
      default:
        console.log("opción no encontrada");
    }
    try {
      await API.post(`/projects/${id}`, planData); // put data to server
      message.success("Cambios guardados");
    } catch (e) {
      console.log("ERROR", e);
      message.error(`No se guardaron los datos:¨${e}`);
    }
  };
  const onChangeSwitchCurr1 = async (checked) => {
    console.log(`switch to ${checked}`);
    setApprove80(true);
    let planData = {};
    planData = {
      ...plan,
      status: "san_curriculum_1",
    };
    if (checked && approveMethodology) {
      try {
        await API.post(`/projects/${id}`, planData); // put data to server
        message.success("Cambios guardados");
      } catch (e) {
        console.log("ERROR", e);
        message.error(`No se guardaron los datos:¨${e}`);
      }
    }
  };

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  return (
    <>
      <Title
        level={4}
        style={{
          color: "#034c70",
          marginLeft: 30,
        }}
      >
        Datos Generales
      </Title>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={plan}
      >
        <Form.Item
          name="teacher_name"
          label="Director"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="coodirector"
          label="Coodirector"
          rules={[{ type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="partner" label="Compañero de titulación">
          <Input />
        </Form.Item>
        <Form.Item name="project_type" label="Tipo de proyecto">
          <Input />
        </Form.Item>
        <Form.Item name="research_line" label="Línea de investigación">
          <Input />
        </Form.Item>
        <Form.Item name="knowledge_area" label="Área de investigación">
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Título">
          <Input.TextArea />
        </Form.Item>
      </Form>
      <Collapse defaultActiveKey={["1"]} onChange={callback}>
        <Panel
          header="Curriculum saneado 1 (para ingreso plan de titulación)"
          key="1"
        >
          <Row>
            <Col>
              <Checkbox
                onChange={(e) => onChange(e, "san_curriculum_1")}
                checked={plan.status && plan.status === "san_curriculum_1"}
              >
                Está tomando o ya tiene aprobado Metodología de la Investigación
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch
                onChange={onChangeSwitchCurr1}
                checked={plan.status && plan.status === "san_curriculum_1"}
              />
              <label>cuenta con más del 80% de materias aprobadas</label>
            </Col>
          </Row>
        </Panel>
        <Panel header="Registro de plan en Saew" key="2">
          <Switch
            onChange={(checked) => setCheckSAEW(checked)}
            checked={
              plan.status &&
              (plan.status === "san_curriculum_2" ||
                plan.status === "tribunal_assigned")
            }
          />
          <label>Está registrado en el SAEW</label>
        </Panel>
        <Panel header="Curriculum saneado 2" key="3">
          <Checkbox
            onChange={(e) => onChange(e, "san_curriculum_2")}
            checked={
              plan.status &&
              (plan.status === "san_curriculum_2" ||
                plan.status === "tribunal_assigned")
            }
          >
            Haber aprobado la materia de Diseños de Proyectos de Titulación
          </Checkbox>
          <Checkbox
            onChange={(e) => onChange(e, "san_curriculum_2_2")}
            checked={
              plan.status &&
              (plan.status === "san_curriculum_2" ||
                plan.status === "tribunal_assigned")
            }
          >
            Tener 100% de aprobación de la malla curricular
          </Checkbox>
        </Panel>
        <Panel header="Requisitos para declarar apta defensa oral" key="4">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </>
  );
};

export default ProjectDetailSecretary;

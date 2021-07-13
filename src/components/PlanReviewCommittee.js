import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import "../styles/plan-form.css";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import withAuth from "../hocs/withAuth";
import { useTeachers } from "../data/useTeachers";
import Loading from "./Loading";
import API from "../data";
import { usePlanContent } from "../data/usePlan";
import AddComments from "./AddComments";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const { confirm } = Modal;

const getBase64 = (file, callback) => {
  console.log("file", file);
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

const PlanFormCommittee = ({ visible, update, idPlan }) => {
  const [form] = Form.useForm();

  let location = useLocation();
  // const { projects, isError, isLoading } = useProject();
  const { plan, isLoading } = usePlanContent(idPlan);
  const { teachers } = useTeachers();
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [sending, setSending] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sendingPlan, setSendingPlan] = useState(false);
  const [approvePlan, setApprovePlan] = useState(false);
  // const [ rejectPlan, setRejectPlan ] = useState( false );
  const [isFinished, setIsFinished] = useState(false);
  const [showComments, showAddCommentsModal] = useState(false);
  const [comments, setComments] = useState(" ");

  const showAddComments = async (values) => {
    showAddCommentsModal(true);
    setComments(values);
  };

  console.log(plan, isFinished);

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} es requerido!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onSentComments = async (values) => {
    setSending(true);
    const data = {
      ...values,
    };

    console.log("DATOS", data);

    try {
      await API.post(`/projects/${plan.id}/plan-review-commission`); // put data to server
      setSending(false);
      confirm({
        icon: <CheckCircleOutlined />,
        title: (
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Buen trabajo!
          </Title>
        ),
        content: (
          <>
            <Row justify="center">
              <Col>
                <Image src="boy.png" width={100} />
                <Image src="girl.png" width={100} />
              </Col>
            </Row>

            <Row>
              <Col>
                <p style={{ color: "#034c70" }}>
                  Gracias por tu esfuerzo en revisar el plan,
                  <br />
                  <strong>tus comentarios han sido enviados</strong>.
                </p>
              </Col>
            </Row>
          </>
        ),
        okText: "Entendido",
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: "#034c70",
            marginRight: 125,
          },
        },
        cancelButtonProps: { hidden: true },
      });
    } catch (e) {
      console.log("ERROR", e);
      message.error(`No se guardaron los datos:¨${e}`);
    }
  };

  const onCompleteForm = () => {
    const formData = form.getFieldsValue();
    if (
      formData.bibliography !== undefined &&
      formData.general_objective !== undefined &&
      formData.hypothesis !== undefined &&
      formData.justification !== undefined &&
      formData.knowledge_area !== undefined &&
      formData.methodology !== undefined &&
      formData.problem !== undefined &&
      formData.project_type !== undefined &&
      formData.research_line !== undefined &&
      formData.specifics_objectives !== undefined &&
      formData.work_plan !== undefined
    ) {
      setIsFinished(true);
    }
    console.log("FORM", formData);
  };

  const modal = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de aprobar el plan?",
      content:
        "Una vez aprobado se enviará una notificación al estudiante y al director.",
      okText: "Si",
      cancelText: "No",
      onOk() {
        onFinish();
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  const modalReject = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de rechazar el plan?",
      content: "Una vez rechazado no podrá deshacer la acción.",
      okText: "Si",
      cancelText: "No",
      onOk() {
        onReject();
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  const modalChanges = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de solicitar cambios?",
      okText: "Si",
      cancelText: "No",
      onOk() {
        onSentComments();
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  const modalProps = {
    title: (
      <Title level={1} style={{ color: "#034c70" }}>
        Confirmación
      </Title>
    ),
    okText: (
      <span>
        <CheckOutlined />
        Aprobar plan
      </span>
    ),
    cancelButtonProps: { hidden: true },
    closeIcon: <CloseCircleOutlined style={{ color: "#034c70" }} />,
    visible: approvePlan,
    width: 600,
    style: { borderRadius: 25 },
    okButtonProps: {
      loading: sendingPlan,
      style: {
        marginRight: 250,
        backgroundColor: "#034c70",
      },
      disabled: !checked,
    },
    onOk() {
      modal();
    },
    onCancel() {
      setApprovePlan(false);
    },
  };
  const onChange = (checkedValue) => {
    console.log(checkedValue);
    if (checkedValue.length === 18) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const contentApproveModal = (
    <>
      <Checkbox.Group onChange={onChange}>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Título del trabajo de titulación
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"1"}>
              Está redactando de forma clara, precisa y entendible.
            </Checkbox>
            <Checkbox value={"2"}>Describe el problema y la solución.</Checkbox>
            <Checkbox value={"3"}>
              Describe el tema que es objetivo del estudio.
            </Checkbox>
            <Checkbox value={"4"}>
              Está de acuerdo a los objetivos planteados.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Planteamiento del problema
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"5"}>
              Identifica síntomas causas que permiten pronosticar <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;las consecuencias si
              persiste el problema.
            </Checkbox>
            <Checkbox value={"6"}>Describe el problema y la solución.</Checkbox>
            <Checkbox value={"7"}>
              Describe el tema que es objetivo del estudio.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Justificación
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"8"}>
              Justifica el ¿por qué? Y ¿para qué? Se realiza el trabajo.
            </Checkbox>
            <Checkbox value={"9"}>Presenta las debidas evidencias.</Checkbox>
            <Checkbox value={"10"}>
              Desglosa la justificación teórica, metodológica y/o práctica.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Objetivo General
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"11"}>
              Acorde al título del trabajo de titulación, escrito en verbo
              infinitivo.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Objetivos específicos
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"12"}>
              Presenta más de 2 objetivos específicos, escritos en verbos
              infinitivos.
            </Checkbox>
            <Checkbox value={"13"}>
              No son pasos metodológicos, procedimientos, actividades.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Metodología
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"14"}>
              Describe las actividades que se realizarán durante <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;la ejecución del trabajo
              de titulación.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Plan de trabajo
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"15"}>
              Detalla las etapas macro de trabajo de titulación.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Cronograma
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"16"}>
              Describe las etapas del trabajo de titulación con <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sus respectivos tiempos
              de ejecución.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4} style={{ color: "#034c70" }}>
              Bibliografía
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox style={{ marginLeft: 8 }} value={"17"}>
              Las referencias bibliográficas tienen valor académico <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; y son contemporáneas a
              pertinentes.
            </Checkbox>
            <Checkbox value={"18"}>
              Las fuentes citadas son de apoyo para sustentar el trabajo de
              titulación.
            </Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
    </>
  );

  const onFinish = async () => {
    setSendingPlan(true);
    const data = form.getFieldsValue();
    let dataToSent = {
      ...data,
      title_comment: "",
      problem_comment: "",
      general_objective_comment: "",
      specifics_objectives_comment: "",
      hypothesis_comment: "",
      justification_comment: "",
      methodology_comment: "",
      work_plan_comment: "",
      schedule_comment: "",
      bibliography_comment: "",
    };
    try {
      await API.post(`/projects/${plan.id}/plan-approved-commission`); // put data to server

      setSendingPlan(false);
      confirm({
        icon: <CheckCircleOutlined />,
        title: (
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Buen trabajo!
          </Title>
        ),
        content: (
          <>
            <Row justify="center">
              <Col>
                <Image src="boy.png" width={100} />
                <Image src="girl.png" width={100} />
              </Col>
            </Row>

            <Row>
              <Col>
                <p style={{ color: "#034c70" }}>
                  Gracias por tu esfuerzo en revisar el plan,
                  <br />
                  <strong>el plan ha sido aprobado.</strong>.
                </p>
              </Col>
            </Row>
          </>
        ),
        okText: "Entendido",
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: "#034c70",
            marginRight: 125,
          },
        },
        cancelButtonProps: { hidden: true },
      });
    } catch (e) {
      console.log("ERROR", e);
      message.error(`No se guardaron los datos:¨${e}`);
    }
  };

  const onReject = async () => {
    const data = form.getFieldsValue();
    let dataToSent = {
      ...data,
    };
    try {
      await API.post(`/projects/${plan.id}/plan-rejected`); // put data to server
      setSending(false);
      confirm({
        icon: <CheckCircleOutlined />,
        title: (
          <Title level={3} style={{ color: "#034c70" }}>
            ¡Listo!
          </Title>
        ),
        content: (
          <>
            <Row justify="center">
              <Col>
                <Image src="boy.png" width={100} />
                <Image src="girl.png" width={100} />
              </Col>
            </Row>

            <Row>
              <Col>
                <p style={{ color: "#034c70" }}>
                  Se ha rechazo este plan,
                  <br />
                  <strong>han sido enviadas las notificaciones</strong>.
                </p>
              </Col>
            </Row>
          </>
        ),
        okText: "Entendido",
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: "#034c70",
            marginRight: 125,
          },
        },
        cancelButtonProps: { hidden: true },
      });
    } catch (e) {
      console.log("ERROR", e);
      message.error(`No se guardaron los datos:¨${e}`);
    }
  };

  const normPhotoFile = (e) => {
    console.log("Upload event:", e);
    const file = e.file;
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("La imagen debe tener formato JPG o PNG");
      setFileList([]);
      setImageUrl(null);
      return null;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("La imagen debe ser menor a 2MB");
      setFileList([]);
      setImageUrl(null);
      return null;
    }

    if (file.status === "removed") {
      setFileList([]);
      setImageUrl(null);
      return null;
    }

    getBase64(e.file, (imageUrl) => setImageUrl(imageUrl));

    if (Array.isArray(e)) {
      return e;
    }

    console.log("e.file", e.file);
    console.log("e.fileList", e.fileList);
    setFileList([file]);

    return e && [e.file];
  };

  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Row>
        <Col>
          <Title level={4}>
            {/*{plan["students"].length > 0 ? plan["students"][0]["name"] : ""}*/}
          </Title>
          <Title level={5}>{plan.title}</Title>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Title
            level={4}
            style={{
              color: "#034c70",
              marginLeft: 30,
              marginTop: 40,
            }}
          >
            Datos Generales
          </Title>
          <Form.Provider onFormChange={onCompleteForm}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={modalChanges}
              initialValues={plan}
              validateMessages={validateMessages}
              form={form}
            >
              <Row justify="center">
                <Col>
                  <Form.Item
                    name="teacher_id"
                    label="Seleccione su director"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      loading={isLoading}
                      disabled={true}
                    >
                      {teachers &&
                        teachers.map((teacher, index) => (
                          <Option value={teacher.id} key={index}>
                            {teacher.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="codirector"
                    label="Seleccione su co-director"
                  >
                    <Input
                      style={{ width: 300 }}
                      placeholder="Nombre del co-director"
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item name="partner" label="Seleccione su compañero">
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="project_type" label="Tipo de proyecto">
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    >
                      <Option value="areaInvestigation">
                        Investigación de campo
                      </Option>
                      <Option value="documentalInvestigation">
                        Investigación documental
                      </Option>
                      >
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="research_line"
                    label="Línea de investigación"
                  >
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="knowledge_area"
                    label="Área de investigación"
                  >
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Title
                    justify={"left"}
                    level={4}
                    style={{
                      color: "#034c70",
                      marginLeft: 30,
                      marginTop: 50,
                    }}
                  >
                    Plan
                  </Title>
                </Col>
              </Row>

              <Row justify={"left"}>
                <Col>
                  <CommentOutlined
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("title_comment")}
                  />
                  <Form.Item
                    name="title"
                    label="Título"
                    rules={[{ required: true }]}
                  >
                    <TextArea
                      style={{ width: 600 }}
                      placeholder="Máximo 15 palabras"
                      autoSize={{
                        minRows: 2,
                        maxRows: 5,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="problem_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("problem_comment")}
                  />

                  <Form.Item name="problem" label="Planteamiento del problema">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="justification_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("justification_comment")}
                  />
                  <Form.Item name="justification" label="Justificación">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="hypothesis_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("hypothesis_comment")}
                  />
                  <Form.Item name="hypothesis" label="Hipótesis">
                    <TextArea
                      style={{ width: 600 }}
                      placeholder="Si no aplica escribir N/A"
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="general_objective_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("general_objective_comment")}
                  />
                  <Form.Item name="general_objective" label="Objetivo General">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="specifics_objectives_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() =>
                      showAddComments("specifics_objectives_comment")
                    }
                  />
                  <Form.Item
                    name="specifics_objectives"
                    label="Objetivos Específicos"
                  >
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="methodology_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("methodology_comment")}
                  />
                  <Form.Item name="methodology" label="Metodología">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="work_plan_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("work_plan_comment")}
                  />
                  <Form.Item name="work_plan" label="Plan de trabajo">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 15,
                        maxRows: 15,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>

                  <CommentOutlined
                    name="schedule_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("schedule_comment")}
                  />
                  <Form.Item
                    name="schedule"
                    label="Cronograma"
                    getValueFromEvent={normPhotoFile}
                  >
                    <Upload
                      name="files"
                      accept="image/jpeg,image/png"
                      listType="picture-card"
                      multiple={false}
                      showUploadList={false}
                      beforeUpload={() => false}
                      fileList={fileList}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Foto"
                          style={{ width: "180px" }}
                        />
                      ) : (
                        <div>
                          <PlusOutlined />
                          <div className="ant-upload-text">Subir imagen</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>

                  <CommentOutlined
                    name="bibliography_comment"
                    style={{
                      color: "#034c70",
                      fontSize: 25,
                      marginLeft: 15,
                      float: "right",
                    }}
                    onClick={() => showAddComments("bibliography_comment")}
                  />
                  <Form.Item name="bibliography" label="Bibliografía">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button
                      className={"submit"}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                      onClick={() => setApprovePlan(true)}
                    >
                      <CheckOutlined /> Aprobar Plan
                    </Button>
                    <Button
                      className={"submit"}
                      htmlType="submit"
                      loading={sending}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                    >
                      Solicitar cambios
                    </Button>
                    <Button
                      className={"submit"}
                      disabled={
                        !(
                          plan.status === "san_curriculum_1" ||
                          plan.status === "plan_corrections_done2"
                        )
                      }
                      onClick={modalReject}
                    >
                      <CloseOutlined /> Rechazar Plan
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Form.Provider>
        </Col>
      </Row>

      <Modal {...modalProps}>{contentApproveModal}</Modal>

      <Modal
        visible={showComments}
        footer={null}
        onCancel={() => showAddCommentsModal(false)}
      >
        <AddComments
          comments={comments}
          planID={idPlan}
          plan={plan}
          closeModal={() => showAddCommentsModal(false)}
        />
      </Modal>
    </>
  );
};
export default withAuth(PlanFormCommittee);

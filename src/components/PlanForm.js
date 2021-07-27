import {
  Button,
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
  CommentOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Routes from "../constants/routes";
import { useLocation } from "react-router-dom";
import withAuth from "../hocs/withAuth";
import { useStudentProject } from "../data/useStudentProjects";
import { useTeachers } from "../data/useTeachers";
import Loading from "./Loading";
import API from "../data";
import ViewComments from "./ViewComments";

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

const PlanForm = ({ visible, update }) => {
  const [form] = Form.useForm();

  const getProjectData = () => {
    const formData = form.getFieldsValue();
    return (
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
    );
  };

  let location = useLocation();
  const { projects, isLoading } = useStudentProject();
  const { teachers } = useTeachers();
  const [imageUrl, setImageUrl] = useState(
    projects[0] && projects[0].schedule
      ? `http://localhost:8000/api/project/getSchedule/${projects[0].id}`
      : ""
  );
  const [fileList, setFileList] = useState([]);
  const [sending, setSending] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(() => {
    getProjectData();
  });
  const [showComments, showViewCommentsModal] = useState(false);
  const [comments, setComments] = useState(" ");

  const showViewComments = async (values) => {
    showViewCommentsModal(true);
    setComments(values);
  };

  console.log(projects, isFinished);

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

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);

    // form.validateFields()
    //   .then( async( values ) => {
    //
    //     console.log( 'values', values );

    const data = new FormData();
    data.append("codirector", values.codirector ? values.codirector : "");
    data.append("partner", values.partner ? values.partner : "");
    data.append("project_type", values.project_type ? values.project_type : "");
    data.append(
      "research_line",
      values.research_line ? values.research_line : ""
    );
    data.append(
      "knowledge_area",
      values.knowledge_area ? values.knowledge_area : ""
    );
    data.append("title", values.title);
    data.append("problem", values.problem ? values.problem : "");
    data.append(
      "justification",
      values.justification ? values.justification : ""
    );
    data.append("hypothesis", values.hypothesis ? values.hypothesis : "");
    data.append(
      "general_objective",
      values.general_objective ? values.general_objective : ""
    );
    data.append(
      "specifics_objectives",
      values.specifics_objectives ? values.specifics_objectives : ""
    );
    data.append("methodology", values.methodology ? values.methodology : "");
    data.append("work_plan", values.work_plan ? values.work_plan : "");
    data.append("schedule", values.schedule ? values.schedule[0] : null);
    data.append("bibliography", values.bibliography ? values.bibliography : "");
    data.append("teacher_id", values.teacher_id);

    console.log("DATOS", values);

    try {
      await API.post("/students/projects", data); // post data to server
      setImageUrl(null);
      message.success("Cambios guardados correctamente!");
    } catch (e) {
      console.log("ERROR", e);
      //.error( `No se guardaron los datos:¨${ e }` );
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleRemove = () => {
    setImageUrl(null);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const onUpdate = async () => {
    const formData = form.getFieldsValue();
    const data = {
      ...formData,
    };

    const forms = new FormData();
    if (
      formData.schedule &&
      formData.schedule !== `storage/schedule/${projects[0].id}/schedule.jpg`
    ) {
      forms.append("schedule", formData.schedule[0]);
    }

    console.log("DATOS", data);

    if (projects.length > 0) {
      try {
        await API.post(`/projects/${projects[0].id}`, forms);
        await API.post(`/projects/${projects[0].id}`, {
          codirector: data.codirector,
          partner: data.partner,
          project_type: data.project_type,
          research_line: data.research_line,
          knowledge_area: data.knowledge_area,
          title: data.title,
          problem: data.problem,
          justification: data.justification,
          hypothesis: data.hypothesis,
          general_objective: data.general_objective,
          specifics_objectives: data.specifics_objectives,
          methodology: data.methodology,
          work_plan: data.work_plan,
          bibliography: data.bibliography,
          teacher_id: data.teacher_id,
        });
      } catch (e) {
        console.log("ERROR", e);
      }
    } else {
      onCreate(data);
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
  };

  const modal = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de mandar el plan?",
      content: (
        <>
          {projects[0].status === "plan_review_commission" ? (
            <Row>
              <Col>
                <p>Una vez enviado le llegará a la comisión.</p>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <p>Una vez enviado le llegará a tu director.</p>
              </Col>
            </Row>
          )}
        </>
      ),
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

  const onFinish = async () => {
    setSending(true);
    const data = form.getFieldsValue();
    let dataToSent = { ...data };

    try {
      if (projects[0].status === "plan_review_teacher") {
        await API.post(`/projects/${projects[0].id}/plan-corrections-done`);
      } else if (projects[0].status === "plan_review_commission") {
        await API.post(`/projects/${projects[0].id}/plan-corrections-done-2`);
      } else {
        await API.post(`/projects/${projects[0].id}/plan-sent`);
      }
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

            {projects[0].status === "plan_review_commission" ? (
              <Row>
                <Col>
                  <p style={{ color: "#034c70" }}>
                    Tu plan ha sido enviado.
                    <br />
                    Ahora deberá ser aprobado por la comisión.
                  </p>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
                  <p style={{ color: "#034c70" }}>
                    Tu plan ha sido enviado.
                    <br />
                    Ahora deberá ser aprobado por tu director.
                  </p>
                </Col>
              </Row>
            )}
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title
            level={4}
            style={{
              color: "#034c70",
              marginLeft: 30,
            }}
          >
            Datos Generales
          </Title>
          <Form.Provider
            onFormChange={() => {
              onCompleteForm();
              setTimeout(() => {
                onUpdate().then(() => {
                  console.log("Cambios guardados correctamente!");
                });
              }, 2000);
            }}
          >
            <Form
              {...layout}
              name="nest-messages"
              onFinish={projects.length > 0 ? onUpdate : onCreate}
              initialValues={projects.length > 0 ? projects[0] : {}}
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
                      disabled={projects.length > 0}
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
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item name="partner" label="Seleccione su compañero">
                    <Select
                      placeholder="Seleccione"
                      style={{ width: 300 }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
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
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    >
                      <Option value="areaInvestigation">
                        Investigación de campo
                      </Option>
                      <Option value="documentalInvestigation">
                        Investigación documental
                      </Option>
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
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
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
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
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
                    }}
                  >
                    Plan
                  </Title>
                </Col>
              </Row>

              <Row justify={"left"}>
                <Col>
                  {projects[0] &&
                  projects[0].title_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("title_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
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
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].problem_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("problem_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}

                  <Form.Item name="problem" label="Planteamiento del problema">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 4,
                        maxRows: 15,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].justification_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("justification_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item name="justification" label="Justificación">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 4,
                        maxRows: 15,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].hypothesis_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("hypothesis_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item name="hypothesis" label="Hipótesis">
                    <TextArea
                      style={{ width: 600 }}
                      placeholder="Si no aplica escribir N/A"
                      autoSize={{
                        minRows: 4,
                        maxRows: 15,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].general_objective_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() =>
                        showViewComments("general_objective_comment")
                      }
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item name="general_objective" label="Objetivo General">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 4,
                        maxRows: 7,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].specifics_objectives_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() =>
                        showViewComments("specifics_objectives_comment")
                      }
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item
                    name="specifics_objectives"
                    label="Objetivos Específicos"
                  >
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 4,
                        maxRows: 15,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].methodology_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("methodology_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item name="methodology" label="Metodología">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 4,
                        maxRows: 15,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].work_plan_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("work_plan_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item name="work_plan" label="Plan de trabajo">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 4,
                        maxRows: 15,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>

                  {projects[0] &&
                  projects[0].schedule_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("schedule_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item
                    name="schedule"
                    label="Cronograma"
                    getValueFromEvent={normPhotoFile}
                  >
                    <Upload
                      name="files"
                      accept="image/jpeg,image/png"
                      listType="text"
                      multiple={false}
                      showUploadList={false}
                      beforeUpload={() => false}
                      filelist={imageUrl}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    >
                      <Button
                        icon={<UploadOutlined />}
                        disabled={
                          projects[0] &&
                          !(
                            projects[0].status === "plan_saved" ||
                            projects[0].status === "plan_review_teacher" ||
                            projects[0].status === "plan_review_commission"
                          )
                        }
                      >
                        Subir Imagen
                      </Button>
                    </Upload>
                  </Form.Item>

                  <div style={{ marginLeft: 300, marginBottom: 20 }}>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt="Foto"
                        style={{ width: "490px" }}
                      />
                    )}
                  </div>

                  {projects[0] &&
                  projects[0].bibliography_comment &&
                  (projects[0].status === "plan_review_teacher" ||
                    projects[0].status === "plan_review_commission") ? (
                    <CommentOutlined
                      style={{
                        color: "#034c70",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                      onClick={() => showViewComments("bibliography_comment")}
                    />
                  ) : (
                    <CommentOutlined
                      style={{
                        color: "transparent",
                        fontSize: 25,
                        marginLeft: 15,
                        float: "right",
                      }}
                    />
                  )}
                  <Form.Item name="bibliography" label="Bibliografía">
                    <TextArea
                      style={{ width: 600 }}
                      autoSize={{
                        minRows: 4,
                        maxRows: 7,
                      }}
                      disabled={
                        projects[0] &&
                        !(
                          projects[0].status === "plan_saved" ||
                          projects[0].status === "plan_review_teacher" ||
                          projects[0].status === "plan_review_commission"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Row>
                      <Col>
                        <p>
                          Todos los cambios serán <br />
                          guardados automáticamente
                        </p>
                      </Col>
                      <Col>
                        <Button
                          className={"submit"}
                          onClick={modal}
                          disabled={!isFinished}
                          style={{ marginLeft: 10 }}
                          loading={sending}
                        >
                          <SendOutlined /> Enviar plan
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Form.Provider>
        </Col>
      </Row>

      <Modal
        visible={showComments}
        footer={null}
        onCancel={() => showViewCommentsModal(false)}
      >
        <ViewComments
          comments={comments}
          planID={projects[0] ? projects[0].id : ""}
          plan={projects}
          closeModal={() => showViewCommentsModal(false)}
        />
      </Modal>
    </>
  );
};

export default withAuth(PlanForm);

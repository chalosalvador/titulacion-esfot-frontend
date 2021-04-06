import React, { useState } from "react";
import {
  Upload,
  message,
  Typography,
  Button,
  Form,
  Row,
  Col,
  Modal,
  Image,
} from "antd";
import {
  InboxOutlined,
  DownloadOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useStudentProject } from "../data/useStudentProjects";
import API from "../data";
import Routes from "../constants/routes";

const { Dragger } = Upload;
const { Title } = Typography;
const { confirm } = Modal;

const ProjectUpload = () => {
  const { projects } = useStudentProject();
  const [isUpload, setIsUpload] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form] = Form.useForm();

  console.log("projects", projects[0]);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.target.files;
  };

  const props = {
    name: "file",
    accept: "application/pdf",
    // listType: "picture",
    maxCount: 1,
    showUploadList: {
      showPreviewIcon: true,
    },
    disabled: !(
      projects[0].status === "plan_approved_commission" ||
      projects[0].status === "project_corrections_done"
    ),
    beforeUpload: () => false,
    onRemove: () => {
      setIsUpload(false);
    },
  };

  const onFinish = async (formData) => {
    console.log("fileUpload", formData.report_pdf[0]);
    setIsSending(true);
    const data = new FormData();
    data.append("report_pdf", formData.report_pdf[0]);

    try {
      await API.post(`/projects/${projects[0].id}/pdf`, data);
      setIsSending(false);
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
                  Tu proyecto ha sido enviado.
                  <br />
                  Ahora deberá ser aprobado por tu director.
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
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const modal = (file) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de mandar el proyecto?",
      content: (
        <>
          <Row>
            <Col>
              <p>Una vez enviado le llegará a tu director.</p>
            </Col>
          </Row>
        </>
      ),
      okText: "Si",
      cancelText: "No",
      onOk() {
        onFinish(file);
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: { style: { backgroundColor: "#034c70" } },
    });
  };

  return (
    <>
      <Title
        level={1}
        style={{
          color: "#034c70",
        }}
      >
        Proyecto de Titulación
      </Title>
      <Title level={3} style={{ color: "#407088" }}>
        Formato proyecto de titulación
      </Title>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{
            backgroundColor: "#034c70",
            color: "#fff",
            fontSize: 13,
            marginLeft: 15,
          }}
          href={
            "https://esfot.epn.edu.ec/index.php/component/jdownloads/category/47-unidad-de-titulacion?Itemid=0/Formulario%20F_AA_225%20-%20Formato%20Plan%20Trabajo%20de%20Titulaci%C3%B3n%20y%20Tesis.docx"
          }
        >
          <DownloadOutlined />
          Descargar formato proyecto de titulación .docx
        </Button>
      </div>

      <Title level={3} style={{ color: "#407088", marginTop: 30 }}>
        Proyecto
      </Title>

      <Form
        name="project-upload"
        onFinish={modal}
        initialValues={
          projects.length > 0 && projects[0].report_pdf
            ? projects[0].report_pdf
            : null
        }
        form={form}
      >
        <Form.Item
          name={"report_pdf"}
          valuePropName={"fileList"}
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Por favor seleccione un archivo .pdf" },
          ]}
        >
          <Row type="flex" justify="center" align="middle">
            <Col>
              <Dragger {...props} style={{ width: 350, height: 250 }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: "#034c70" }} />
                </p>
                <p className="ant-upload-text">
                  Click o arrastre un archivo a esta área para subirlo
                </p>
                <p className="ant-upload-hint">Suba un archivo .pdf</p>
              </Dragger>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="center" align="middle">
            <Col>
              <Button
                htmlType={"submit"}
                style={{ marginLeft: 10 }}
                loading={isSending}
                disabled={
                  !(
                    projects[0].status === "plan_approved_commission" ||
                    projects[0].status === "project_corrections_done"
                  )
                }
              >
                <SendOutlined /> Enviar proyecto
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectUpload;

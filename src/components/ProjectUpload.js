import React, { useState } from "react";
import { Upload, message, Typography, Button } from "antd";
import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import { useStudentProject } from "../data/useStudentProjects";
import API from "../data";

const { Dragger } = Upload;
const { Title } = Typography;

const ProjectUpload = () => {
  const { projects } = useStudentProject();
  const [pdf, setPdf] = useState("");

  console.log("projects", JSON.stringify(projects[0]));

  const props = {
    name: "file",
    multiple: false,
    accept: "application/pdf",
    action: async (file) => {
      console.log("file", file);
      try {
        await API.post(`/projects/${projects[0].id}`, {
          ...projects[0],
        });
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    onChange(info) {
      const { status } = info.file;
      setPdf(info.file.type);
      if (status !== "uploading") {
        console.log("INFO", info);
      }
      if (status === "done") {
        message.success(`${info.file.name} archivo fue subido exitosamente.`);
      } else if (status === "error") {
        message.error(`${info.file.name} archivo no pudo subirse.`);
      }
    },
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

      <div style={{ marginLeft: "32%" }}>
        <Dragger {...props} style={{ width: 350, height: 250 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: "#034c70" }} />
          </p>
          <p className="ant-upload-text">
            Click o arrastre un archivo a esta área para subirlo
          </p>
          <p className="ant-upload-hint">Suba un archivo .pdf</p>
        </Dragger>
      </div>
    </>
  );
};

export default ProjectUpload;

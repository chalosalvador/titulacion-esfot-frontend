/* eslint import/no-webpack-loader-syntax: 0 */

import React, { useState, useEffect, useCallback } from "react";
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";

import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
  setPdfWorker,
} from "react-pdf-highlighter";
import {
  Button,
  Col,
  Row,
  Checkbox,
  Typography,
  Modal,
  message,
  Image,
} from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { usePlanContent } from "../data/usePlan";
import { useGetProjectPDF } from "../data/useGetProjectPDF";
import API from "../data";
import Routes from "../constants/routes";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import "../styles/pdf.css";

setPdfWorker(PDFWorker);

const { Title } = Typography;
const { confirm } = Modal;

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const ProjectReview = ({ idPlan }) => {
  const [approveProject, setApproveProject] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendingProject, setSendingProject] = useState(false);
  const [checked, setChecked] = useState(false);
  const { plan, isLoading } = usePlanContent(idPlan);
  const { pdf, isLoading1 } = useGetProjectPDF(idPlan);
  const [highlights, setHighlights] = useState(
    JSON.parse(plan.highlights) || []
  );

  const PRIMARY_PDF_URL = `http://localhost:8000/api/project/getPDF/${idPlan}`;
  const initialUrl = PRIMARY_PDF_URL;

  const [url, setUrl] = useState(initialUrl);
  console.log("plan", plan);

  console.log("highlights", highlights);

  if (isLoading && isLoading1) {
    return <h1>Loading...</h1>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getHighlightById = useCallback(
    (id) => {
      return highlights.find((highlight) => highlight.id === id);
    },
    [highlights]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight) {
      scrollViewerTo(highlight);
    }
  }, [getHighlightById]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);

    return () => {
      window.removeEventListener("hashchange", scrollToHighlightFromHash);
    };
  }, [scrollToHighlightFromHash]);

  const resetHighlights = () => {
    setHighlights([]);
  };

  let scrollViewerTo = () => {};

  const addHighlight = async (highlight) => {
    console.log("Saving highlight", highlight);

    localStorage.setItem(
      "highlights",
      JSON.stringify([{ ...highlight, id: getNextId() }, ...highlights])
    );
    setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);
  };

  const updateHighlight = (highlightId, position, content) => {
    console.log("Updating highlight", highlightId, position, content);

    setHighlights(
      highlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      })
    );
  };

  const modal = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "¿Estás seguro de mandar el proyecto?",
      content:
        "Una vez aprobado se enviará a secretaria para asignar a un tribunal.",
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

  const onSentComments = async () => {
    setSending(true);

    let dataToSent = {
      highlights: JSON.stringify(highlights),
    };

    try {
      await API.post(`/projects/${plan.id}`, dataToSent);
      await API.post(`/projects/${plan.id}/project-review-teacher`); // put data to server
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
                  Gracias por tu esfuerzo en revisar el proyecto,
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

  const onFinish = async () => {
    setSendingProject(true);
    const dataToSent = { highlights: null };
    try {
      await API.post(`/projects/${plan.id}`, dataToSent); //put data to server
      await API.post(`/projects/${plan.id}/project-approved-director`); // change status
      setSendingProject(false);
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
                  Gracias por tu esfuerzo en revisar el proyecto de titulación,
                  <br />
                  <strong>
                    ha sido enviado a secretaria para asignación de tribunal
                  </strong>
                  .
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
      message.error("No se pudo enviar la información, intente de nuevo");
    }
  };
  const onChange = (checkedValue) => {
    console.log(checkedValue);
    if (checkedValue.length === 5) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  const modalProps = {
    title: (
      <Title level={1} style={{ color: "#034c70" }}>
        Confirmación
      </Title>
    ),
    okText: (
      <span style={{ color: "white" }}>
        <CheckOutlined />
        Aprobar proyecto
      </span>
    ),
    cancelButtonProps: { hidden: true },
    closeIcon: <CloseCircleOutlined style={{ color: "#034c70" }} />,
    visible: approveProject,
    width: 600,
    style: { borderRadius: 25 },
    okButtonProps: {
      loading: sendingProject,
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
      setApproveProject(false);
    },
  };
  const modalContent = (
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
            <Checkbox value={"1"}>
              El formato, la organización de contenidos, redacción, uso de
              gramática y
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ortografía, aplicación
              de normas de citas y referencia son adecuadas
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Checkbox value={"2"}>
              La organización de contenidos tiene una secuencia lógica y sigue
              un orden que&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;facilita la comprensión del
              trabajo efectuado.
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Checkbox value={"3"}>
              Los objetivos planteados para el trabajo son coherentes entre si y
              se corresponden &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;con los
              resultados alcanzados y las conclusiones derivadas del trabajo
              efectuado
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Checkbox value={"4"}>
              Las conclusiones y recomendaciones constituyen aportes
              significativos del trabajo
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ejecutado y son útiles para
              trabajos futuros.
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Checkbox value={"5"}>
              Las referencias seleccionadas son pertinentes y se han citado de
              manera adecuada.
            </Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
    </>
  );

  return (
    <div>
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          highlights={highlights}
          resetHighlights={resetHighlights}
          teacher={"teacher"}
        />
        <div
          style={{
            height: "100vh",
            width: "75vw",
            position: "relative",
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                // pdfScaleValue="page-width"
                scrollRef={(scrollTo) => {
                  scrollViewerTo = scrollTo;

                  scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={(comment) => {
                      addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={(popupContent) =>
                        setTip(highlight, (highlight) => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <Row justify={"center"}>
          <Col>
            <Button
              className={"submit"}
              onClick={() => onSentComments()}
              loading={sending}
              disabled={
                !(
                  plan.status === "project_uploaded" ||
                  plan.status === "project_corrections_done"
                )
              }
            >
              <SendOutlined /> Enviar comentarios al estudiante
            </Button>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col>
            <Button
              className={"submit"}
              onClick={() => setApproveProject(true)}
              disabled={
                !(
                  plan.status === "project_uploaded" ||
                  plan.status === "project_corrections_done"
                )
              }
            >
              <CheckOutlined /> Aprobar proyecto de titulación
            </Button>
          </Col>
        </Row>
        <Modal {...modalProps}>{modalContent}</Modal>
      </div>
    </div>
  );
};
export default ProjectReview;

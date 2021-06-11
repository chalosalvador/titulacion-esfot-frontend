// import React, { useState } from "react";
// import {
//   Button,
//   Col,
//   Row,
//   Checkbox,
//   Typography,
//   Modal,
//   message,
//   Image,
// } from "antd";
// import {
//   CheckCircleOutlined,
//   CheckOutlined,
//   CloseCircleOutlined,
//   ExclamationCircleOutlined,
//   SendOutlined,
// } from "@ant-design/icons";
// // import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";
// import { usePlanContent } from "../data/usePlan";
// import { useGetProjectPDF } from "../data/useGetProjectPDF";
// import API from "../data";
// import Routes from "../constants/routes";
// import Loading from "./Loading";
// import { Document, Page } from "react-pdf";
// import { PdfHighlighter, PdfLoader } from "react-pdf-highlighter";
// const { Title } = Typography;
// const { confirm } = Modal;
// // setPdfWorker(PDFWorker);
//
// const ProjectReview = ({ idPlan }) => {
//   const [approveProject, setApproveProject] = useState(false);
//   const [sendingProject, setSendingProject] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const { plan, isLoading } = usePlanContent(idPlan);
//   const { pdf, isLoading1, isError } = useGetProjectPDF(idPlan);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//
//   const URL = "https://arxiv.org/pdf/1708.08021.pdf";
//
//   if (isLoading && isLoading1) {
//     return <h1>Loading...</h1>;
//   }
//
//   if (isError) {
//     return <h1>Error</h1>;
//   }
//
//   console.log("plan", plan);
//   console.log("pdf", pdf);
//
//   const modal = () => {
//     confirm({
//       icon: <ExclamationCircleOutlined />,
//       title: "¿Estás seguro de mandar el proyecto?",
//       content:
//         "Una vez aprobado se enviará a secretaria para asignar a un tribunal.",
//       okText: "Si",
//       cancelText: "No",
//       onOk() {
//         onFinish();
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//       okButtonProps: { style: { backgroundColor: "#034c70" } },
//     });
//   };
//   const onFinish = async () => {
//     setSendingProject(true);
//     const dataToSent = { ...plan };
//     dataToSent.status = "project_approved_director";
//     try {
//       await API.post(`/projects/${plan.id}`, dataToSent); // put data to server
//       setSendingProject(false);
//       confirm({
//         icon: <CheckCircleOutlined />,
//         title: (
//           <Title level={3} style={{ color: "#034c70" }}>
//             ¡Buen trabajo!
//           </Title>
//         ),
//         content: (
//           <>
//             <Row justify="center">
//               <Col>
//                 <Image src="boy.png" width={100} />
//                 <Image src="girl.png" width={100} />
//               </Col>
//             </Row>
//
//             <Row>
//               <Col>
//                 <p style={{ color: "#034c70" }}>
//                   Gracias por tu esfuerzo en revisar el proyecto de titulación,
//                   <br />
//                   <strong>
//                     ha sido enviado a secretaria para asignación de tribunal
//                   </strong>
//                   .
//                 </p>
//               </Col>
//             </Row>
//           </>
//         ),
//         okText: "Entendido",
//         okButtonProps: {
//           href: Routes.HOME,
//           style: {
//             backgroundColor: "#034c70",
//             marginRight: 125,
//           },
//         },
//         cancelButtonProps: { hidden: true },
//       });
//     } catch (e) {
//       message.error("No se pudo enviar la información, intente de nuevo");
//     }
//   };
//   const onChange = (checkedValue) => {
//     console.log(checkedValue);
//     if (checkedValue.length === 5) {
//       setChecked(true);
//     } else {
//       setChecked(false);
//     }
//   };
//   const modalProps = {
//     title: (
//       <Title level={1} style={{ color: "#034c70" }}>
//         Confirmación
//       </Title>
//     ),
//     okText: (
//       <span style={{ color: "white" }}>
//         <CheckOutlined />
//         Aprobar proyecto
//       </span>
//     ),
//     cancelButtonProps: { hidden: true },
//     closeIcon: <CloseCircleOutlined style={{ color: "#034c70" }} />,
//     visible: approveProject,
//     width: 600,
//     style: { borderRadius: 25 },
//     okButtonProps: {
//       loading: sendingProject,
//       style: {
//         marginRight: 250,
//         backgroundColor: "#034c70",
//       },
//       disabled: !checked,
//     },
//     onOk() {
//       modal();
//     },
//     onCancel() {
//       setApproveProject(false);
//     },
//   };
//   const modalContent = (
//     <>
//       <Checkbox.Group onChange={onChange}>
//         <Row>
//           <Col>
//             <Title level={4} style={{ color: "#034c70" }}>
//               Título del trabajo de titulación
//             </Title>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Checkbox value={"1"}>
//               El formato, la organización de contenidos, redacción, uso de
//               gramática y
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ortografía, aplicación
//               de normas de citas y referencia son adecuadas
//             </Checkbox>
//           </Col>
//         </Row>
//         <Row style={{ marginTop: 10 }}>
//           <Col>
//             <Checkbox value={"2"}>
//               La organización de contenidos tiene una secuencia lógica y sigue
//               un orden que&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;facilita la comprensión del
//               trabajo efectuado.
//             </Checkbox>
//           </Col>
//         </Row>
//         <Row style={{ marginTop: 10 }}>
//           <Col>
//             <Checkbox value={"3"}>
//               Los objetivos planteados para el trabajo son coherentes entre si y
//               se corresponden &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;con los
//               resultados alcanzados y las conclusiones derivadas del trabajo
//               efectuado
//             </Checkbox>
//           </Col>
//         </Row>
//         <Row style={{ marginTop: 10 }}>
//           <Col>
//             <Checkbox value={"4"}>
//               Las conclusiones y recomendaciones constituyen aportes
//               significativos del trabajo
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ejecutado y son útiles para
//               trabajos futuros.
//             </Checkbox>
//           </Col>
//         </Row>
//         <Row style={{ marginTop: 10 }}>
//           <Col>
//             <Checkbox value={"5"}>
//               Las referencias seleccionadas son pertinentes y se han citado de
//               manera adecuada.
//             </Checkbox>
//           </Col>
//         </Row>
//       </Checkbox.Group>
//     </>
//   );
//
//   const HighlightPopup = ({ comment }) =>
//     comment.text ? (
//       <div className="Highlight__popup">
//         {comment.emoji} {comment.text}
//       </div>
//     ) : null;
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };
//
//   const resetHash = () => {
//     document.location.hash = "";
//   };
//
//   return (
//     <>
//       <PdfLoader
//         url={"http://localhost:8000/storage/reports/1/project.pdf"}
//         beforeLoad={"Cargando..."}
//       >
//         {(pdfDocument) => (
//           <PdfHighlighter
//             pdfDocument={pdfDocument}
//             enableAreaSelection={(event) => event.altKey}
//             onScrollChange={resetHash}
//             // pdfScaleValue="page-width"
//             scrollRef={(scrollTo) => {
//               this.scrollViewerTo = scrollTo;
//
//               this.scrollToHighlightFromHash();
//             }}
//             onSelectionFinished={(
//               position,
//               content,
//               hideTipAndSelection,
//               transformSelection
//             ) => (
//               <Tip
//                 onOpen={transformSelection}
//                 onConfirm={(comment) => {
//                   this.addHighlight({ content, position, comment });
//
//                   hideTipAndSelection();
//                 }}
//               />
//             )}
//             highlightTransform={(
//               highlight,
//               index,
//               setTip,
//               hideTip,
//               viewportToScaled,
//               screenshot,
//               isScrolledTo
//             ) => {
//               const isTextHighlight = !Boolean(
//                 highlight.content && highlight.content.image
//               );
//
//               const component = isTextHighlight ? (
//                 <Highlight
//                   isScrolledTo={isScrolledTo}
//                   position={highlight.position}
//                   comment={highlight.comment}
//                 />
//               ) : (
//                 <AreaHighlight
//                   highlight={highlight}
//                   onChange={(boundingRect) => {
//                     this.updateHighlight(
//                       highlight.id,
//                       { boundingRect: viewportToScaled(boundingRect) },
//                       { image: screenshot(boundingRect) }
//                     );
//                   }}
//                 />
//               );
//
//               return (
//                 <Popup
//                   popupContent={<HighlightPopup {...highlight} />}
//                   onMouseOver={(popupContent) =>
//                     setTip(highlight, (highlight) => popupContent)
//                   }
//                   onMouseOut={hideTip}
//                   key={index}
//                   children={component}
//                 />
//               );
//             }}
//             highlights={highlights}
//           />
//         )}
//       </PdfLoader>
//       <Row justify={"center"}>
//         <Col>
//           <Button
//             className={"submit"}
//             disabled={
//               !(
//                 plan.status === "project_uploaded" ||
//                 plan.status === "project_corrections_done"
//               )
//             }
//           >
//             <SendOutlined /> Enviar comentarios al estudiante
//           </Button>
//         </Col>
//       </Row>
//       <Row justify={"center"}>
//         <Col>
//           <Button
//             className={"submit"}
//             onClick={() => setApproveProject(true)}
//             disabled={
//               !(
//                 plan.status === "project_uploaded" ||
//                 plan.status === "project_corrections_done"
//               )
//             }
//           >
//             <CheckOutlined /> Aprobar proyecto de titulación
//           </Button>
//         </Col>
//       </Row>
//       <Modal {...modalProps}>{modalContent}</Modal>
//     </>
//   );
// };
//
// export default ProjectReview;
import React, { Component } from "react";

// eslint-disable-next-line import/no-webpack-loader-syntax
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

import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import "../styles/pdf.css";

setPdfWorker(PDFWorker);

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

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = SECONDARY_PDF_URL;

class ProjectReview extends Component {
  state = {
    url: initialUrl,
    highlights: testHighlights[initialUrl]
      ? [...testHighlights[initialUrl]]
      : [],
  };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };

  toggleDocument = () => {
    const newUrl =
      this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    this.setState({
      url: newUrl,
      highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
    });
  };

  scrollViewerTo = (highlight) => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }

  addHighlight(highlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights],
    });
  }

  updateHighlight(highlightId, position, content) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map((h) => {
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
      }),
    });
  }

  render() {
    const { url, highlights } = this.state;

    return (
      <div>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
          toggleDocument={this.toggleDocument}
        />
        <div>
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                // pdfScaleValue="page-width"
                scrollRef={(scrollTo) => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
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
                      this.addHighlight({ content, position, comment });

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
                        this.updateHighlight(
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
    );
  }
}

export default ProjectReview;

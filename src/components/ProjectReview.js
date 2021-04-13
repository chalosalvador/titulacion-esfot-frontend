import React, {useState} from "react";
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
import {usePlanContent} from "../data/usePlan";
import API from "../data";
import Routes from "../constants/routes";

const {Title} = Typography;
const {confirm} = Modal;

const ProjectReview = ({idPlan}) => {
    const [approveProject, setApproveProject] = useState(false);
    const [sendingProject, setSendingProject] = useState(false);
    const [checked, setChecked] = useState(false);
    const {plan, isLoading} = usePlanContent(idPlan);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    console.log("plan", plan);

    const modal = () => {
        confirm({
            icon: <ExclamationCircleOutlined/>,
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
            okButtonProps: {style: {backgroundColor: "#034c70"}},
        });
    };
    const onFinish = async () => {
        setSendingProject(true);
        const dataToSent = {...plan};
        dataToSent.status = "project_approved_director";
        try {
            await API.post(`/projects/${plan.id}`, dataToSent); // put data to server
            setSendingProject(false);
            confirm({
                icon: <CheckCircleOutlined/>,
                title: (
                    <Title level={3} style={{color: "#034c70"}}>
                        ¡Buen trabajo!
                    </Title>
                ),
                content: (
                    <>
                        <Row justify="center">
                            <Col>
                                <Image src="boy.png" width={100}/>
                                <Image src="girl.png" width={100}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p style={{color: "#034c70"}}>
                                    Gracias por tu esfuerzo en revisar el proyecto de titulación,
                                    <br/>
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
                cancelButtonProps: {hidden: true},
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
            <Title level={1} style={{color: "#034c70"}}>
                Confirmación
            </Title>
        ),
        okText: (
            <span style={{color: "white"}}>
        <CheckOutlined/>
        Aprobar proyecto
      </span>
        ),
        cancelButtonProps: {hidden: true},
        closeIcon: <CloseCircleOutlined style={{color: "#034c70"}}/>,
        visible: approveProject,
        width: 600,
        style: {borderRadius: 25},
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
                        <Title level={4} style={{color: "#034c70"}}>
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
                <Row style={{marginTop: 10}}>
                    <Col>
                        <Checkbox value={"2"}>
                            La organización de contenidos tiene una secuencia lógica y sigue
                            un orden que&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;facilita la comprensión del
                            trabajo efectuado.
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Col>
                        <Checkbox value={"3"}>
                            Los objetivos planteados para el trabajo son coherentes entre si y
                            se corresponden &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;con los
                            resultados alcanzados y las conclusiones derivadas del trabajo
                            efectuado
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Col>
                        <Checkbox value={"4"}>
                            Las conclusiones y recomendaciones constituyen aportes
                            significativos del trabajo
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ejecutado y son útiles para
                            trabajos futuros.
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{marginTop: 10}}>
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
        <>
            <p>Aqui va el proyecto incrustado</p>
            <Row justify={"center"}>
                <Col>
                    <Button className={"submit"}
                            disabled={!(plan.status === "project_uploaded" || plan.status === "project_corrections_done")}>
                        <SendOutlined/> Enviar comentarios al estudiante
                    </Button>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col>
                    <Button className={"submit"} onClick={() => setApproveProject(true)}
                            disabled={!(plan.status === "project_uploaded" || plan.status === "project_corrections_done")}>
                        <CheckOutlined/> Aprobar proyecto de titulación
                    </Button>
                </Col>
            </Row>
            <Modal {...modalProps}>{modalContent}</Modal>
        </>
    );
};

export default ProjectReview;

import React, {useState} from "react";
import {Button, Card, Col, Form, Input, Modal, Row, Select, Skeleton, Table, Tag} from "antd";
import ShowError from "./ShowError";
import {useProjects} from "../data/useProjects";
import SecretaryAddTeacherForm from "./SecretaryAddTeacherForm";
import Title from "antd/es/typography/Title";
import {useCareersList} from "../data/useCareersList";
import {Option} from "antd/es/mentions";
import NewTribunalForm from "./NewTribunalForm";

const {Item} = Form;

const ProjectsList = ({tribunal, allProjects}) => {
    const [state, setState] = useState({
        idPlan: null,
        status: null,
        showPlanReview: false,
    });
    const {projectsList, isLoading, isError} = useProjects();
    const {careers} = useCareersList();
    const [visible, setVisible] = useState(false);
    let titleModal = "";
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [tribunalData, setTribunalData] = useState();
    const [projectId, setProjectId] = useState();

    if (isLoading) {
        return (
            <Row justify="center" gutter={30}>
                {[...new Array(9)].map((_, i) => (
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        <div style={{textAlign: "center"}}>
                            <Skeleton.Image style={{width: 200}}/>
                            <Card title="" extra="" cover="" loading/>
                        </div>
                    </Col>
                ))}
            </Row>
        );
    }

    const dataTribunal = projectsList
        .map(
            (project, index) =>
                project.status === "san_curriculum_2" && {
                    key: index,
                    originalData: project,
                    title: project.title,
                    teacher_name: project.teacher_name,
                    created_at: project.created_at,
                    status: project.status,
                }
        )
        .filter(Boolean);

    const dataDate = projectsList
        .map(
            (project, index) =>
                project.status === "test_defense_apt" && {
                    key: index,
                    originalData: project,
                    title: project.title,
                    teacher_name: project.teacher_name,
                    created_at: project.created_at,
                    status: project.status,
                }
        )
        .filter(Boolean);

    const data = projectsList
        .map((project, index) => ({
            key: index,
            originalData: project,
            title: project.title,
            teacher_name: project.teacher_name,
            created_at: project.created_at,
            status: project.status,
            career: project.teacher_career
        }))
        .filter(Boolean);

    console.log("projects", projectsList);

    if (isError) {
        return <ShowError error={isError}/>;
    }
    // if (props) {
    //   if (props === "date") {
    //     setDateAssigned(true);
    //   } else if (props === "tribunal") {
    //     setTribunalAssigned(true);
    //   }
    // }

    const columns = [
        {
            title: "Título",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Fecha de creación",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Profesor",
            dataIndex: "teacher_name",
            key: "teacher_name",
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            width: 125,
            render: (status) => {
                let color = "";
                let name = "";
                {
                    switch (status) {
                        case "plan_saved":
                            color = "orange";
                            name = "Plan en desarrollo";
                            break;

                        case "plan_sent" || "plan_corrections_done" || "plan_saved":
                            color = "blue";
                            name = "Por revisar de director";
                            break;

                        case "plan_review_teacher":
                            color = "orange";
                            name = "Correcciones de director enviadas";
                            break;

                        case "plan_approved_director":
                            color = "green";
                            name = "Plan aprobado por director";
                            break;

                        case "plan_review_commission":
                            color = "orange";
                            name = "Correcciones de comisión enviadas";
                            break;

                        case "plan_corrections_done2":
                            color = "blue";
                            name = "Por revisar por comisión";
                            break;

                        case "plan_approved_commission":
                            color = "green";
                            name = "Plan aprobado por comisión";
                            break;

                        case "san_curriculum_1":
                            color = "purple";
                            name = "Curriculum saneado 1";
                            break;

                        case "san_curriculum_2":
                            color = "purple";
                            name = "Curriculum saneado 2";
                            break;

                        case "plan_rejected":
                            color = "red";
                            name = "Plan rechazado";
                            break;

                        case "project_uploaded" || "project_corrections_done":
                            color = "cyan";
                            name = "PDF por revisar";
                            break;

                        case "project_review_teacher":
                            color = "magenta";
                            name = "Correcciones de PDF enviadas";
                            break;

                        case "tribunal_assigned":
                            color = "lime";
                            name = "Tribunal asignado";
                            break;

                        case "project_graded":
                            color = "yellow";
                            name = "Proyecto calificado";
                            break;

                        case "test_defense_apt":
                            color = "green";
                            name = "Apto para defensa oral";
                            break;

                        case "date_defense_assigned":
                            color = "geekblue";
                            name = "Fecha de defensa asignada";
                            break;

                        case "project_completed":
                            color = "gold";
                            name = "Proyecto completado";
                            break;

                        case "project_rejected":
                            color = "red";
                            name = "Proyecto rechazado";
                            break;

                        default:
                            break;
                    }
                    return (
                        <Tag color={color} key={status}>
                            {name.toUpperCase()}
                        </Tag>
                    );
                }
            },
        },
    ];

    const showModal = () => {
        setVisible(true);
    };

    titleModal = (
        <Title level={3} style={{color: "#034c70"}}>
            Asignar tribunal
        </Title>
    )


    return (
        <>
            {tribunal && !allProjects ? (
                <Table
                    columns={columns}
                    dataSource={dataTribunal}
                    rowKey={(dataTribunal) => dataTribunal.id}
                    onRow={(record) => {
                        return {
                            onClick: (event) => {
                                event.stopPropagation();
                                setVisible(true);
                                setTribunalData(record.originalData);
                                setProjectId(record.key);
                            },
                        };
                    }}
                />
            ) : !tribunal && !allProjects ? (
                <Table
                    columns={columns}
                    dataSource={dataDate}
                    rowKey={(dataDate) => dataDate.id}
                    onRow={(record) => {
                        return {
                            onClick: (event) => {
                                event.stopPropagation();
                                setVisible(true);
                                setTribunalData(record.originalData);
                                setProjectId(record.key);
                            },
                        };
                    }}
                />
            ) : (
                !tribunal &&
                allProjects && (
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey={(data) => data.id}
                        onRow={(record) => {
                            return {
                                onClick: (event) => {
                                    event.stopPropagation();
                                    setVisible(true);
                                    setTribunalData(record.originalData);
                                    setProjectId(record.key);
                                },
                            };
                        }}
                    />
                )
            )}
            <Modal
                title={titleModal}
                visible={visible}
                confirmLoading={confirmLoading}
                footer={null}
                closable={true}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
            >
                <NewTribunalForm project={tribunalData}
                                 projectid={projectId}
                                 closeModal={() => setVisible(false)}/>
            </Modal>
        </>
    );
};

export default ProjectsList;

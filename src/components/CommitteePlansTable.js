import React, { useState } from "react";
import { Col, Row, Table, Tag, Typography } from "antd";
import "../styles/home-teacher.css";
import { useProjects } from "../data/useProjects";
import Loading from "./Loading";
import SearchColumnFilter from "./SearchColumnFilter";
import PlanReviewCommittee from "./PlansReviewCollapseCommittee";

const { Title } = Typography;

const CommitteePlansTable = () => {
  const [state, setState] = useState({
    idPlan: null,
    showPlanReview: false,
  });

  const { projectsList, isLoading, isError } = useProjects();
  console.log("proyectos al inicio", projectsList);
  const columns = [
    {
      key: "students",
      dataIndex: "students",
      title: "Estudiante(s)",
      width: 250,
      ...SearchColumnFilter("students")
      // render: (students) => (
      //   <span>
      //     {/*{students.length > 1 ? (*/}
      //     {/*  <>*/}
      //     {/*    <h4>{students[0].name}</h4>*/}
      //     {/*    <h4>{students[1].name}</h4>*/}
      //     {/*  </>*/}
      //     {/*) : (*/}
      //     {/*  <h4>{students[0].name}</h4>*/}
      //     {/*)}*/}
      //   </span>
      // ),
    },
    {
      key: "title",
      dataIndex: "title",
      title: "Título",
      ...SearchColumnFilter("title"),
      render: (text) => <a>{text}</a>,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Estado",
      render: (status) => {
        let state = "Plan aprobado";
        let color = "green";
        if (
          status === "san_curriculum_1" ||
          status === "plan_corrections_done2"
        ) {
          state = "Por revisar";
          color = "red";
        } else if (status === "plan_review_commission") {
          state = "Correcciones enviadas";
          color = "blue";
        }
        return (
          <span>
            <Tag color={color}>{state}</Tag>
          </span>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  const data = [];

  for (let i = 0; i < projectsList.length; i++) {
    if (
      projectsList[i].status === "san_curriculum_1" ||
      projectsList[i].status === "plan_review_commission" ||
      projectsList[i].status === "plan_corrections_done2" ||
      projectsList[i].status === "plan_approved_commission"
    ) {
      data.push({
        key: projectsList[i].id,
        title: projectsList[i].title,
        status: projectsList[i].status,
        students: projectsList[i].student_name,
        id: projectsList[i].id,
      });
    }
  }

  console.log("projects", data);

  let content = "";
  let titleTable = "";
  if (!state.showPlanReview) {
    titleTable = (
      <Title level={3} style={{ color: "#034c70" }}>
        Planes y proyectos de titulación
      </Title>
    );

    content = (
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(data) => data.id}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              setState({
                idPlan: record.id,
                showPlanReview: true,
              });
            },
          };
        }}
      />
    );
  } else {
    content = <PlanReviewCommittee planId={state.idPlan} />;
  }

  return (
    <>
      <Row>
        <Col>{titleTable}</Col>
      </Row>
      <Row justify="center">
        <Col>{content}</Col>
      </Row>
    </>
  );
};

export default CommitteePlansTable;

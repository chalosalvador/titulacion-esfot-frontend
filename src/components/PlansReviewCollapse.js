import React from "react";
import { Col, Collapse, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import PlanReviewTeacher from "./PlanReviewTeacher";
import ProjectReview from "./ProjectReview";
import "../styles/plan-collapse.css";

const { Panel } = Collapse;

const PlanReview = (props) => {
  console.log("status", props.status);
  return (
    <>
      <Row>
        <Col span={24} className="planCollapse">
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header="Plan de titulación"
              key="1"
              className="site-collapse-custom-panel"
            >
              <PlanReviewTeacher idPlan={props.planId} user={"director"} />
            </Panel>
            <Panel
              header="Proyecto de titulación"
              key="2"
              className="site-collapse-custom-panel"
              collapsible={
                props.status === "plan_saved" ||
                props.status === "plan_sent" ||
                props.status === "plan_review_teacher" ||
                props.status === "plan_corrections_done" ||
                props.status === "plan_approved_director" ||
                props.status === "plan_review_commission" ||
                props.status === "plan_approved_commission" ||
                props.status === "plan_rejected" ||
                props.status === "san_curriculum_1"
                  ? "disabled"
                  : "header"
              }
            >
              <ProjectReview idPlan={props.planId} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default PlanReview;

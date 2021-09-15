import React from "react";
import "../styles/plan-form.css";
import withAuth from "../hocs/withAuth";
import PlanReview from "./planReview";

const PlanReviewTeacher = ({ idPlan }) => {
  return (
    <>
      <PlanReview idPlan={idPlan} user={"director"} />
    </>
  );
};

export default withAuth(PlanReviewTeacher);

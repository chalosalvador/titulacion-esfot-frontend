import React from "react";
import TeacherPanel from "../components/TeacherPanel";
import withAuth from "../hocs/withAuth";
import SubLayout from "../components/SubLayout";
import AdministrativePanel from "../components/AdministrativePanel";

const TeacherPanelPage = () => {
  return (
    <SubLayout>
      <AdministrativePanel />
    </SubLayout>
  );
};

export default withAuth(TeacherPanelPage);

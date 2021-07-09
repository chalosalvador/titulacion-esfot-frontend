import React from "react";
import withAuth from "../hocs/withAuth";
import SubLayout from "../components/SubLayout";
import AdministrativePanel from "../components/AdministrativePanel";

const AdministrativePanelPage = ({ location }) => {
  return (
    <SubLayout>
      <AdministrativePanel
        tribunal={location.state.tribunal}
        allProjects={location.state.allProjects}
      />
    </SubLayout>
  );
};

export default withAuth(AdministrativePanelPage);

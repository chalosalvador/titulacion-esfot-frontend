import React from "react";
import SubLayout from "../components/SubLayout";
import ProjectsListStatus from "../components/ProjectsListStatus";
import { useProjects } from "../data/useProjects";
import Loading from "../components/Loading";
import ShowError from "../components/ShowError";
import { useJuries } from "../data/useJuries";
import { useAuth } from "../providers/Auth";

const JuryProjectsListPage = () => {
  const { juries, isLoading, isError } = useJuries();
  const { currentUser } = useAuth();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ShowError />;
  }

  let project = {};

  const juriesList = juries.map((jury) => {
    for (let i = 0; i < jury.teachers.data.length; i++) {
      if (jury.teachers.data[i].id === currentUser.userable.id) {
        project = {
          originalData: jury.project,
          title: jury.project.title,
          teacher_name: jury.project.teacher_name,
          created_at: jury.project.created_at,
          status: jury.project.status,
        };
      }
    }
    return project;
  });

  return (
    <SubLayout>
      <ProjectsListStatus projectsList={juriesList} isTribunal={true} />
    </SubLayout>
  );
};

export default JuryProjectsListPage;

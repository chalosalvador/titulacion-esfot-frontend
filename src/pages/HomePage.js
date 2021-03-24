import React from "react";
import { useAuth } from "../providers/Auth";
import TeacherHome from "../components/TeacherHome";
import SecretaryHome from "../components/SecretaryHome";
import StudentHome from "../components/StudentHome";
import SubLayout from "../components/SubLayout";

const HomePage = () => {
  const { currentUser } = useAuth();
  return (
    <SubLayout>
      {currentUser.role === "ROLE_TEACHER" ? (
        <TeacherHome />
      ) : currentUser.role === "ROLE_SECRETARY" ? (
        <SecretaryHome />
      ) : (
        <StudentHome />
      )}
    </SubLayout>
  );
};

export default HomePage;

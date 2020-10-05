import React from 'react';
// import { useAuth } from '../providers/Auth';
import TeacherPanel from '../components/TeacherPanel';

const TeacherPanelPage = () => {
  // const { currentUser } = useAuth();

  return (
    <>
      {
        <TeacherPanel />
      }
    </>
  );

};

export default TeacherPanelPage;
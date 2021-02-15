import React from 'react';
import TeacherPanel from '../components/TeacherPanel';
import withAuth from '../hocs/withAuth';

const TeacherPanelPage = () => {
  return (
    <>
      {
        <TeacherPanel />
      }
    </>
  );

};

export default withAuth(TeacherPanelPage);

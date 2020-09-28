import React from 'react';
import { useAuth } from '../providers/Auth';
import TeacherPlans from '../components/TeacherPlans';

const TeacherPlansPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {
        currentUser.role === 'ROLE_TEACHER'
          ? <TeacherPlans />
          : []
      }
    </>
  );

};

export default TeacherPlansPage;
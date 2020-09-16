import React from 'react';
import HomeTeacher from '../components/HomeTeacher';
import { useAuth } from '../providers/Auth';
import HomeStudent from '../components/HomeStudent';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {
        currentUser.role === 'ROLE_TEACHER'
          ? <HomeTeacher />
          : <HomeStudent /> //currentUser.role === 'ROLE_STUDENT'
      }
    </>
  );

};

export default HomePage;

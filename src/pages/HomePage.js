import React from 'react';
import { useAuth } from '../providers/Auth';
import HomeTeacher from '../components/HomeTeacher';
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

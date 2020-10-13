import React from 'react';
import { useAuth } from '../providers/Auth';
import HomeTeacher from '../components/HomeTeacher';
import HomeStudent from '../components/HomeStudent';
import HomeSecretary from '../components/HomeSecretary';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {
        currentUser.role === 'ROLE_TEACHER'
          ? <HomeTeacher />
          : currentUser.role === 'ROLE_STUDENT'
          ? <HomeStudent /> //currentUser.role === 'ROLE_STUDENT'
          : <HomeSecretary/>
      }
    </>
  );

};

export default HomePage;

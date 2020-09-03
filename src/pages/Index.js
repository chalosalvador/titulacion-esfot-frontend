import React from 'react';
import ProjectsList from '../components/ProjectsList';
import { useProjectsList } from '../data/useProjectsList';
import ShowError from '../components/ShowError';
import HomePage from '../components/Home';

const IndexPage = () => {

  return (
    <>
      <HomePage/>
      {/*<h2>Lista de Proyectos</h2>*/}
      {/*<ProjectsList />*/}
    </>
  );
};


export default IndexPage;

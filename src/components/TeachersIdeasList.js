import React from 'react';
import { useTeachersIdeasList } from '../data/useTeachersIdeasList';
import Loading from './Loading';

const TeachersIdeasList = () => {
  const { ideas, isLoading, isError } = useTeachersIdeasList();

  console.log( 'ideas', ideas );

  if( isLoading ) {
    return <div>
      <Loading />
    </div>;
  }
  if( isError ) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <h1>Hola mundo</h1>
    </div>
  );

};

export default TeachersIdeasList;
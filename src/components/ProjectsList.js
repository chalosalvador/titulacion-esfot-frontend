import React from 'react';
import { Skeleton, Card, Col, Row, Table } from 'antd';
import { useProjectsList } from '../data/useProjectsList';
import ShowError from './ShowError';


const ProjectsList = ( props ) => {

  const { projects, isLoading, isError } = useProjectsList();

  if( isLoading ) {
    return <Row justify='center' gutter={ 30 }>
      {
        [ ...new Array( 9 ) ].map( ( _, i ) =>
          <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
            <div style={ { textAlign: 'center' } }>
              <Skeleton.Image style={ { width: 200 } } />
              <Card title='' extra='' cover='' loading />
            </div>
          </Col>
        )
      }
    </Row>;
  }

  if( isError ) {
    return <ShowError error={ isError } />;
  }

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Fecha de creación',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Profesor',
      dataIndex: 'teacher_name',
      key: 'teacher_name',
    }
  ];

  const getProjectsDataTable = ( projects ) => {
    console.log( 'projects', projects );
    return projects.map( ( project ) => (
        {
          key: project.id,
          title: project.title,
          teacher_name: project.teacher_name,
          created_at: project.created_at
        }
      )
    );
  };

  return (
    <>
      <Table columns={ columns } dataSource={ getProjectsDataTable( projects ) } />
    </>
  );
};

export default ProjectsList;

import {
  Row, Card, Col, Button, Layout, Typography, PageHeader, Dropdown, Menu, Input, Modal, Select, Skeleton
} from 'antd';
import React, { useState } from 'react';
import '../styles/teacher-panel.css';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import ShowError from './ShowError';
import Loading from './Loading';
import {
  BellOutlined, HomeOutlined, LoadingOutlined, LogoutOutlined, UserOutlined, PlusOutlined, SearchOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import Routes from '../constants/routes';
import '../styles/home-teacher.css';
import SearchColumnFilter from './SearchColumnFilter';
import PlanReview from './PlansReviewCollapse';
import {useProjects} from '../data/useProjects';

const { Content, Sider } = Layout;
const { Title } = Typography;

const ProjectsListSecretary = () => {

  const { Search } = Input;
  const { projectsList, isLoading, isError} = useProjects();

  let location = useLocation();
  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

  const [ menuState, setMenuState ] = useState( {
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );

  const handleClick = ( e ) => {
    console.log( 'click ', e );
    setMenuState( {
      ...menuState,
      current: e.key
    } );
  };

  React.useEffect( () => {
    setMenuState( {
      ...menuState,
      current: location.pathname
    } );
  }, [ location, isAuthenticated ] );

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
      title: 'Director(a)',
      dataIndex: 'teacher_name',
      key:'teacher_name'
    },
    {
      title: 'Estudiante(s)',
      dataIndex: 'student_name',
      key:'student_name'
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: ( value ) => {
        let color;
        if( value === 'plan_saved' ) {
          color = 'green';
        } else {
          color = 'blue';
        }
        return <div>
          {
            <Tag color={ color } key={ value }>
              { value }
            </Tag>
          }
        </div>;
      }
    }
  ];

  const userMenu = <Menu onClick={ handleClick }>
    <Menu.Item key='password'>Cambiar clave</Menu.Item>
    <Menu.Item key={ Routes.LOGIN }>
      <Link to={ Routes.LOGOUT } className='logout-link'>
        {
          isCheckingAuth
            ? <LoadingOutlined />
            : <><LogoutOutlined /> Cerrar sesión </>
        }
      </Link>
    </Menu.Item>
  </Menu>;

  let pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: false
  };

  const getProjectsData = projectsList.map((project, index) => {
    return {
      key:index,
      teacher_name: project.teacher_name,
      student_name: project['student'].length > 0
        ? project['student'][0]['id']
        :'',
      title: project.title,
      status: project.status
    }
  });

  const onSearch = value => console.log( value );

  return (
    <>
      <Layout>
        <Sider theme='light'
               width={ 300 }
               style={ {
                 backgroundColor: '#dddddd',
                 padding: 40
               } }>
          <Title level={ 3 } style={ { color: '#034c70' } }>Planes</Title>
          <Card className={ 'statistics-content' }
                title='Por revisar para ingreso a revisión de comisión'
                bordered={ false }>
            <Title level={ 2 }>10</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Por registrar en SAEW' bordered={ false }>
            <Title level={ 2 }>5</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Planes por revisar en comisión' bordered={ false }>
            <Title level={ 2 }>12</Title>
          </Card>

          <Title level={ 3 }
                 style={ {
                   color: '#034c70',
                   marginTop: 20
                 } }>Proyectos</Title>

          <Card className={ 'statistics-content' } title='Por revisar para asignar tribunal' bordered={ false }>
            <Title level={ 2 }>2</Title>
          </Card>

          <Card className={ 'statistics-content' }
                title='Por revisar para asignar fecha de grado oral'
                bordered={ false }>
            <Title level={ 2 }>3</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Por enviar carpeta a Vicerrectorado' bordered={ false }>
            <Title level={ 2 }>4</Title>
          </Card>
        </Sider>
        <Layout>
          <PageHeader className='inner-menu'
                      title={ <Title level={ 1 } style={ {
                        color: '#034c70'
                      } }>Planes y proyectos de titulación:</Title> }
                      extra={ [
                        <Button key='home' type='text' style={ { color: '#034c70' } }>
                          <Link to={ Routes.HOME }>
                            <HomeOutlined />
                          </Link>
                        </Button>,
                        <Button key='notifications'
                                type='text'
                                style={ { color: '#034c70' } }
                                icon={ <BellOutlined /> } />,
                        <Dropdown key='user-menu' overlay={ userMenu } placement='bottomLeft'>
                          <Button type='text' style={ { color: '#034c70' } } icon={ <UserOutlined /> }>
                            { currentUser && currentUser.name }
                          </Button>
                        </Dropdown>,
                      ] }
          />
          <Content style={ { padding: 30 } }>
            <Row>
              <Col>
                <br />
                <Search
                  placeholder='búsqueda de tema o estudiantes'
                  onSearch={ onSearch }
                  enterButton=<Button
                  style={ {
                    backgroundColor: '#034c70',
                    color: 'white'
                  } }
                  icon={ <SearchOutlined /> } />
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <br />
                <Table
                  columns={ columns }
                  dataSource={ getProjectsData } />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>


    </>
  );

};

export default (ProjectsListSecretary);

import React, { useState } from 'react';
import { Card, Layout, Menu, Typography, PageHeader, Button, Dropdown, Row, Col, Table, Tag } from 'antd';
import { useAuth } from '../providers/Auth';
import Routes from '../constants/routes';
import '../styles/home-teacher.css';
import { Link, useLocation } from 'react-router-dom';
import { useProjects } from '../data/useProjects';
import { BellOutlined, LoadingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Loading from './Loading';
import SearchColumnFilter from './SearchColumnFilter';

const { Title } = Typography;
const { Content, Sider } = Layout;

const CommitteePlansTable = () => {

  let location = useLocation();

  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();
  const { projectsList, isLoading, isError } = useProjects();
  const [ menuState, setMenuState ] = useState( {
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );

  React.useEffect( () => {
    setMenuState( {
      ...menuState,
      current: location.pathname
    } );
  }, [ location, isAuthenticated ] );

  const handleClick = ( e ) => {
    console.log( 'click ', e );
    setMenuState( {
      ...menuState,
      current: e.key
    } );
  };
  const columns = [
    {
      key: 'students',
      dataIndex: 'students',
      title: 'Estudiante(s)',
      width: 150,
      ...SearchColumnFilter( 'students' ),
      render: students => (
        <span>
          {
            students.length > 1
              ?
              <>
                <h4>{ students[ 0 ].name }</h4>
                <h4>{ students[ 1 ].name }</h4>
              </>
              :
              <h4>{ students[ 0 ].name }</h4>
          }
        </span>
      )
      ,
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Título',
      ...SearchColumnFilter( 'title' ),
      render: text => <a>{ text }</a>,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Estado',
      render: status => {
        let state = 'Plan aprobado';
        let color = 'green';
        if( status === 'san_curriculum_1' ) {
          state = 'Por revisar';
          color = 'red';
        } else if( status === 'plan_review_commission' ) {
          state = 'Correcciones enviadas';
          color = 'blue';
        }
        return (
          <span>
            <Tag color={ color }>
              { state }
            </Tag>
          </span>
        );
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

  if( isLoading ) {
    return <Loading />;
  }
  if( isError ) {
    return <h1>Error</h1>;
  }

  const data = [];

  for( let i = 0; i < projectsList.length; i++ ) {
    if( projectsList[ i ].status === 'san_curriculum_1' ) {
      data.push( {
        key: projectsList[ i ].id,
        title: projectsList[ i ].title,
        status: projectsList[ i ].status,
        students: projectsList[ i ].students
      } );
    }
  }

  console.log( 'projects', JSON.stringify( data ) );

  return (
    <>
      <Layout>
        <Sider theme='light'
               width={ 300 }
               style={ {
                 backgroundColor: '#dddddd',
                 padding: 40
               } }>
          <Title level={ 3 } style={ { color: '#034c70' } }>Director</Title>
          <Card className={ 'statistics-content' } title='Tesis dirigidas' bordered={ false }>
            <Title level={ 2 }>10</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Planes por revisar' bordered={ false }>
            <Title level={ 2 }>2</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Proyectos por revisar' bordered={ false }>
            <Title level={ 2 }>2</Title>
          </Card>

          <Title level={ 3 } style={ { color: '#034c70' } }>Jurado</Title>

          <Card className={ 'statistics-content' } title='Proyectos por revisar' bordered={ false }>
            <Title level={ 2 }>10</Title>
          </Card>
        </Sider>
        <Layout>
          <PageHeader className='inner-menu'
                      title={ <Title level={ 1 } style={ {
                        color: '#034c70'
                      } }>Comisión titulación</Title> }
                      extra={ [
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
          <Content style={ { padding: 20 } }>
            <Row>
              <Col>
                <Title level={ 4 } style={ {
                  color: '#034c70',
                  marginLeft: 20
                } }>Planes y proyectos de titulación</Title>
              </Col>
            </Row>
            <Row justify='center'>
              <Col>
                <Table columns={ columns } dataSource={ data } />
              </Col>
            </Row>

          </Content>
        </Layout>
      </Layout>
    </>
  );

};

export default CommitteePlansTable;
import React, { useState } from 'react';
import { useTeachersIdeasList } from '../data/useTeachersIdeasList';
import Loading from './Loading';
import { Row, Button, Dropdown, Layout, Menu, PageHeader, Steps, Typography, Col, Table } from 'antd';
import { BellOutlined, LoadingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import SearchColumnFilter from './SearchColumnFilter';
import { useAuth } from '../providers/Auth';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';

const { Step } = Steps;
const { Title } = Typography;
const { Content, Sider } = Layout;

const TeachersIdeasList = () => {
  const { ideas, isLoading, isError } = useTeachersIdeasList();
  let location = useLocation();

  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();
  const [ menuState, setMenuState ] = useState( {
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );

  console.log( 'ideas', ideas );

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

  const columns = [
    {
      title: 'Título del proyecto',
      dataIndex: 'title',
      key: 'title',
      ...SearchColumnFilter( 'title' )
    },
    {
      title: 'Profesor',
      dataIndex: 'teacher_name',
      key: 'teacher_name',
      ...SearchColumnFilter( 'teacher_name' )
    }
  ];


  if( isLoading ) {
    return <div>
      <Loading />
    </div>;
  }
  if( isError ) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Layout>
        <Sider theme='light'
               width={ 300 }
               style={ {
                 backgroundColor: '#dddddd',
                 padding: 40
               } }>
          <Title level={ 3 }>Progreso</Title>
          <Steps direction='vertical'>
            <Step description='Plan enviado' />
            <Step description='Plan aprobado por director' />
            <Step description='Curriculum saneado 1' />
            <Step description='Plan revisado por comisión' />
            <Step description='Plan aprobado por comisión' />
            <Step description='Proyecto de titulación subido' />
            <Step description='Proyecto aprobado por director' />
            <Step description='Curriculum saneado 2' />
            <Step description='Tribunal asignado' />
            <Step description='Proyecto de titulación calificado (documento)' />
            <Step description='Declarado apto para defensa oral' />
            <Step description='Fecha de defensa asignada' />
            <Step description='¡Proyecto completado!' />
          </Steps>
        </Sider>

        <Layout>
          <PageHeader className='inner-menu'
                      title={ <Title level={ 3 }>Panel Estudiante:</Title> }
                      extra={ [
                        <Button key='notifications' type='text' icon={ <BellOutlined /> } />,
                        <Dropdown key='user-menu' overlay={ userMenu } placement='bottomLeft'>
                          <Button type='text' icon={ <UserOutlined /> }>{ currentUser && currentUser.name }</Button>
                        </Dropdown>,
                      ] }
          />
          <Content style={ { padding: 50 } }>
            <Row>
              <Col span={ 24 }>
                <Title level={ 4 }>Temas de titulación</Title>
              </Col>
            </Row>
            <Row>
              <Col>
                <Title level={ 3 }>Propuestos por docentes ESFOT</Title>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table columns={ columns } dataSource={ ideas } />
              </Col>
            </Row>
          </Content>
        </Layout>

      </Layout>
    </>
  );

};

export default TeachersIdeasList;
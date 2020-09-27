import React, { useState } from 'react';
import { useTeachersIdeasList } from '../data/useTeachersIdeasList';
import Loading from './Loading';
import { Row, Button, Dropdown, Layout, Menu, PageHeader, Typography, Col, Table, Modal } from 'antd';
import { BellOutlined, HomeOutlined, LoadingOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import SearchColumnFilter from './SearchColumnFilter';
import StepsSider from './StepsSider';
import { useAuth } from '../providers/Auth';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';

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

  const openModalInFo = ( text, record ) => {
    console.log( text, record );
    Modal.info( {
      title: 'Tema propuesto por docente ESFOT',
      content: (
        <div>
          <Row>
            <Col>
              <p><strong>Tema: </strong></p>
            </Col>
            <Col style={ { paddingLeft: 5 } }>
              <p> { record.title }</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p><strong>Problema a resolver: </strong></p>
            </Col>
            <Col style={ { paddingLeft: 5 } }>
              <p> { record.problem }</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p><strong>Solución: </strong></p>
            </Col>
            <Col style={ { paddingLeft: 5 } }>
              <p> { record.solution }</p>
            </Col>
          </Row>
          <p>Contáctate directamente con el profesor proponente para indicarle que deseas realizar este tema de
            titulación</p>
        </div>
      ),
      width: 500,
      okButtonProps: {
        style: {
          backgroundColor: '#034c70',
          marginRight: 130
        },
        href: 'https://outlook.office.com/',
        target: '_blank'
      },
      okText: 'Enviar e-mial al profesor',
      maskClosable: true,
      centered: true
    } );
  };

  const columns = [
    {
      title: 'Título del proyecto',
      dataIndex: 'title',
      key: 'title',
      width: 500,
      ...SearchColumnFilter( 'title' ),
      render: ( text, record ) => (<a onClick={ () => {openModalInFo( text, record );} }>{ text }</a>)
    },
    {
      title: 'Profesor',
      dataIndex: 'teacher_name',
      key: 'teacher_name',
      width: 225,
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
  const data = ideas.map( ( idea, index ) => {
    return {
      key: index,
      title: idea.title,
      teacher_name: idea.teacher_name,
      problem: idea.problem,
      solution: idea.solution
    };
  } );

  return (
    <>
      <Layout>
        <Sider theme='light'
               width={ 300 }
               style={ {
                 backgroundColor: '#dddddd',
                 padding: 40
               } }>
          <StepsSider />
        </Sider>

        <Layout>
          <PageHeader className='inner-menu'
                      title={ <Title level={ 2 } style={ { color: '#034c70' } }>Temas de titulación</Title> }
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
          <Content style={ {
            padding: 50,
            marginTop: -65
          } }>
            <Row>
              <Col>
                <Title level={ 3 } style={ { color: '#034c70' } }>Propuestos por docentes ESFOT</Title>
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

export default TeachersIdeasList;
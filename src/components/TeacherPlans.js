import React, { useEffect, useState } from 'react';
import '../styles/home-teacher.css';
import 'antd/dist/antd.css';
import Routes from '../constants/routes';
import {
  BellOutlined, UserOutlined, LoadingOutlined,
  LogoutOutlined, HomeOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import { useTeachersPlansList } from '../data/useTeacherPlansList';
import {
  Menu, Card, Typography, Table, Tag, Form, Button, Row, Col, message, Modal, Layout,
  Dropdown, PageHeader
} from 'antd';
import TeacherPlanForm from './TeacherPlanForm';
import API from '../data';
import ErrorList from './ErrorList';
import { translateMessage } from '../utils/translateMessage';
import Loading from './Loading';


const { Title } = Typography;
const { confirm } = Modal;
const { Content, Sider } = Layout;

const TeacherPlans = () => {
  // const [ form ] = Form.useForm();
  const [ form ] = Form.useForm();
  let location = useLocation();


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

  const { teacher_ideas, isLoading, isError } = useTeachersPlansList();
  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();
  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const [ finished, setFinished ] = useState( false );
  const [ data, setData ] = useState( [] );

  React.useEffect( () => {
    setMenuState( {
      ...menuState,
      current: location.pathname
    } );
  }, [ location, isAuthenticated ] );

  const columns = [
    {
      title: 'Tema',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      // render: estado => (
      //   <>
      //     {estado.map(estado => {
      //       let color = estado.length > 5 ? 'geekblue' : 'green';
      //       if (estado === 'assigned') {
      //         color = 'green';
      //       }
      //       if(estado === 'not_assigned'){
      //         color = 'blue';
      //       }
      //       return (
      //         <Tag color={color} key={estado}>
      //           {estado.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
  ];
  if( isLoading ) {
    return <Loading />;
  }

  if( isError ) {
    return <ErrorList errors={ isError } />;
  }

  const dataToTable = teacher_ideas.map( ( teacher_plan ) => ({
      key: teacher_plan.id,
      title: teacher_plan.title,
      status: teacher_plan.status
    })
  );


  // setData( dataToTable );


  const handleCreate = async() => {
    const messageKey = 'saving status';
    confirm( {
      title: '¿Confirmas que deseas enviar el formulario?',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async() => {

        try {
          setIsSubmitting( true );
          const teacherPlanData = form.getFieldsValue();
          let planId = teacherPlanData.id;
          teacherPlanData.status = 'idea_unassigned';
          console.log( teacherPlanData );

          if( !planId ) {
            message.loading( {
              content: 'Guardando los datos del plan',
              key: messageKey
            } );
            const plan = await API.post( `/teacher/teachers-ideas`, teacherPlanData );
            planId = plan.data.id;
            console.log( 'plan created', plan );
          }

          message.success( {
            content: 'Completado!',
            key: messageKey
          } );
          form.resetFields();
          setFinished( true );
          setData( () => [
            ...dataToTable,
            {
              key: planId,
              ...teacherPlanData
            }
          ] );

        } catch( e ) {
          const errorList = e.error && <ErrorList errors={ e.error } />;
          message.error( {
            content: <> { translateMessage( e.message ) }{ errorList }</>,
            key: messageKey
          } );
          console.log( 'e', e );
        }
        setIsSubmitting( false );
      },
      onCancel() {},
    } );
  };

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
                      } }>Director:</Title> }
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
          <Content style={ { padding: 50 } }>
            <TeacherPlanForm form={ form } />
            <Row justify='center'>
              <Col span={ 12 }>
                <Button type='primary' onClick={ handleCreate }>Enviar solicitud</Button>
              </Col>
            </Row>
            <Table
              dataSource={ data }
              columns={ columns } />
          </Content>
        </Layout>

      </Layout>
    </>
  );
};

export default (TeacherPlans);

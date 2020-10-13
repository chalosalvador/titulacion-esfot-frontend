import { Row, Card, Col, Button, Menu, PageHeader, Dropdown, Space, Typography, Layout } from 'antd';
import React, { useState } from 'react';
import '../styles/home-secretary.css';
import {
  BellOutlined, BulbOutlined, UserOutlined, LoadingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';
import graduation from '../images/la_graduation-cap-solid.png'
import teacher from '../images/la_chalkboard-teacher-solid.png'
import people from '../images/raphael_people.png'
const { Title } = Typography;
const { Content, Sider } = Layout;

const HomeSecretary = () => {

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

  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

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
          <Card className={ 'statistics-content' } title='Por revisar para ingreso a revisión de comisión' bordered={ false }>
            <Title level={ 2 }>10</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Por registrar en SAEW' bordered={ false }>
            <Title level={ 2 }>5</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Planes por revisar en comisión' bordered={ false }>
            <Title level={ 2 }>12</Title>
          </Card>

          <Title level={ 3 } style={ { color: '#034c70', marginTop: 20 } }>Proyectos</Title>

          <Card className={ 'statistics-content' } title='Por revisar para asignar tribunal' bordered={ false }>
            <Title level={ 2 }>2</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Por revisar para asignar fecha de grado oral' bordered={ false }>
            <Title level={ 2 }>3</Title>
          </Card>

          <Card className={ 'statistics-content' } title='Por enviar carpeta a Vicerrectorado' bordered={ false }>
            <Title level={ 2 }>4</Title>
          </Card>
        </Sider>

        <Layout>
          <PageHeader className='inner-menu'
                      title={ <Title level={ 3 } style={ {
                        color: '#034c70'
                      } }>Panel Principal:</Title> }
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
          <Content style={ { padding: 50 } }>
            <Row>

              <Col span={ 24 }>

                <Row justify='right'>
                  <Col span={ 6 }>
                    <Card className={ 'options main-options' } title='Planes y proyectos de titulación' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <BulbOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Revisa los planes y proyectos de titulación de la ESFOT
                        </div>
                        <div>
                          <Button >Ver planes y proyectos</Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>


                </Row>
              </Col>
            </Row>

            <Row>
              <Col>
                <Title level={ 3 } style={ {
                  color: '#034c70',
                  marginLeft: -30,
                  marginTop:30
                } }>Administración: </Title>
              </Col>
            </Row>

            <Row>

              <Col span={ 24 } style={{marginTop:30}}>

                <Row justify='center'>
                  <Col span={ 6 }>
                    <Card className={ 'adminoptions main-adminoptions' } title='Estudiantes' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <img src={graduation} className={ 'big-icon' } />
                        </div>
                        <div>
                          Listado de estudiantes de la ESFOT
                        </div>
                        <div>
                          <Button className={'btn-secretary'}>Ingresar</Button>
                        </div>
                      </Space>

                    </Card>
                  </Col>
                  <Col span={ 6 }>
                    <Card className={ 'adminoptions main-adminoptions' } title='Profesores' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <img src={teacher} className={ 'big-icon' } />
                        </div>
                        <div>
                          Listado de profesores de la ESFOT
                        </div>
                        <div>
                          <Button className={'btn-secretary'}>Ingresar</Button>
                        </div>
                      </Space>

                    </Card>
                  </Col>
                  <Col span={ 6 }>
                    <Card className={ 'adminoptions main-adminoptions' } title='Comisiones y Carreras' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <img src={people} className={ 'big-icon' } />
                        </div>
                        <div>
                          Comisiones de titulación de la ESFOT
                        </div>
                        <div>
                          <Button className={'btn-secretary'}>Ingresar</Button>
                        </div>
                      </Space>

                    </Card>
                  </Col>
                  <Col span={ 6 } />
                  <Col span={ 6 } />
                </Row>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default withAuth( HomeSecretary );
import { Row, Card, Col, Button, Menu, PageHeader, Dropdown, Space, Typography, Layout, Steps } from 'antd';
import React, { useState } from 'react';
import '../styles/home-teacher.css';
import {
  BellOutlined, BulbOutlined, BarsOutlined, CheckOutlined, SelectOutlined, UserOutlined, LoadingOutlined,
  LogoutOutlined, LoginOutlined
} from '@ant-design/icons';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';

const { Title } = Typography;
const { Content, Sider } = Layout;

const HomeTeacher = () => {

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
          <Title level={ 3 } style={ { color: '034c70' } }>Director</Title>
          <Card className={ 'statistics-content' } title='Tesis dirigidas' bordered={ false }>
            <p className={ 'numbers' }>10</p>
          </Card>

          <Card className={ 'statistics-content2' } title='Planes por revisar' bordered={ false }>
            <p className={ 'numbers' }>2</p>
          </Card>

          <Card className={ 'statistics-content2' } title='Proyectos por revisar' bordered={ false }>
            <p className={ 'numbers' }>2</p>
          </Card>

          <h1 className={ 'jury' }>Jurado</h1>

          <Card className={ 'jury-statistics' } title='Proyectos por revisar' bordered={ false }>
            <p className={ 'numbers' }>1</p>
          </Card>
        </Sider>

        <Layout>
          <PageHeader className='inner-menu'
                      title={ <Title level={ 3 }>Panel Principal:</Title> }
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

                <Row justify='center' className={ 'principal-options' }>
                  <Col span={ 6 }>
                    <Card className={ 'options main-options' } title='Director' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <BulbOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Revisa los planes y proyectos de titulación que diriges
                        </div>
                        <div>
                          <Button>Ver proyectos</Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>

                  <Col span={ 6 }>
                    <Card className={ 'options main-options' } title='Jurado calificador' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <BulbOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Revisa los proyectos como jurado
                        </div>
                        <div>
                          <Button>Ver proyectos</Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>

                  <Col span={ 6 }>
                    <Card className={ 'options main-options' } title='Listado de temas' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <CheckOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Registrar propuestas de temas
                        </div>
                        <div>
                          <Button>Registrar temas</Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>

                </Row>
              </Col>
            </Row>

            <Title level={ 3 }>Otros recursos:</Title>

            <Row>
              <Col span={ 24 }>
                <Row justify='center'>
                  <Col span={ 6 }>
                    <Card bordered={ false } className='options resources-options'>
                      <Space direction='vertical' size='large'>
                        <div>Mira las normativas de titulación de la EPN</div>
                        <div>
                          <Button href={ 'https://esfot.epn.edu.ec/index.php/unidad-titulacion/normativa-proyectos-titulacion' }>
                            Ver normativas
                          </Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={ 6 }>
                    <Card bordered={ false } className='options resources-options'>
                      <Space direction='vertical' size='large'>
                        <div>Mira los formatos de titulación de la EPN</div>
                        <div>
                          <Button href={ 'https://esfot.epn.edu.ec/index.php/solicitudes/documentos-solicitudes' }>
                            Ver formatos
                          </Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>

                  <Col span={ 6 } />
                </Row>
              </Col>
            </Row>

            <Title level={ 3 }>Comisión titulación: </Title>

            <Row>

              <Col span={ 24 }>

                <Row justify='center' className={ 'options principal-options' }>
                  <Col span={ 6 }>
                    <Card className={ 'options-commission' } title='Planes Comisión' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <SelectOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Revisa los planes que llegan a la comisión de titulación
                        </div>
                        <div>
                          <Button>Ver planes</Button>
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

export default withAuth( HomeTeacher );
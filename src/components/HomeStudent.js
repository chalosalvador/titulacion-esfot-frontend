import React, { useState } from 'react';
import { Row, Card, Steps, Col, Button, Menu, PageHeader, Dropdown, Typography, Layout, Space } from 'antd';
import {
  BellOutlined, CopyOutlined, FundProjectionScreenOutlined, LoadingOutlined, LogoutOutlined, UserOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';
import '../styles/home-student.css';

const { Step } = Steps;
const { Title } = Typography;
const { Content, Sider } = Layout;


const HomeStudent = () => {

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
                <Row justify='center'>
                  <Col span={ 6 }>
                    <Card className='options main-options' title='Plan de titulación' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <FileTextOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Registra tu plan de titulación
                        </div>
                        <div>
                          <Button>Registrar plan</Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>

                  <Col span={ 6 }>
                    <Card className='options main-options' title='Proyecto de titulación' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <CopyOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Sube tu proyecto de titulación
                        </div>
                        <div>
                          <Button>Subir proyecto</Button>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={ 6 }>
                    <Card className='options main-options' title='Defensa de grado' bordered={ false }>
                      <Space direction='vertical' size='large'>
                        <div>
                          <FundProjectionScreenOutlined className={ 'big-icon' } />
                        </div>
                        <div>
                          Mira la fecha de tu defensa de grado
                        </div>
                        <div>
                          <Button>Ver fecha</Button>
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
                        <div>Mira posibles temas de titulación propuestos por los docentes de la ESFOT</div>
                        <div><Button><Link to={ Routes.TEACHERS_IDEAS }>Ver temas</Link></Button></div>
                      </Space>
                    </Card>
                  </Col>
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
                </Row>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default withAuth( HomeStudent );

import { Comment, Row, Card, Steps, Col, Button, Menu } from 'antd';
import React, { useState } from 'react';
import '../styles/home-student.css';
import {
  BellOutlined, CopyOutlined, FundProjectionScreenOutlined, LoadingOutlined, LoginOutlined, LogoutOutlined, UserOutlined
} from '@ant-design/icons';
import {
  FileTextOutlined
} from '@ant-design/icons';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';

const { Step } = Steps;
const { SubMenu } = Menu;

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

  return (
    <div style={ { height: 1007 } }>
      <Menu mode='horizontal' className={ 'menus' } onClick={ handleClick }>
        <Menu.Item key='notification' icon={ <BellOutlined /> } />
        {
          isAuthenticated
            ? <SubMenu icon={ <UserOutlined /> } title={ currentUser && currentUser.name }>
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
            </SubMenu>
            : <Menu.Item key={ Routes.LOGIN }>
              <Link to={ Routes.LOGIN }>
                {
                  isCheckingAuth
                    ? <LoadingOutlined />
                    : <><LoginOutlined /> Ingresar</>
                }
              </Link>
            </Menu.Item>
        }
      </Menu>
      <Card className={ 'states' }>
        <h1 className={ 'titles' }>Progreso</h1>
        <Steps className={ 'steps' } direction='vertical'>
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
      </Card>

      <Row className='principal'>

        <h1 className={ 'title' }>
          Panel Principal:
        </h1>

        <Col span={ 24 }>

          <Row justify='center' className={ 'principal-options' }>
            <Col span={ 6 }>
              <Card className={ 'options' } title='Plan de titulación' bordered={ false }>
                <div>
                  <FileTextOutlined className={ 'big-icon' } />
                </div>
                <br />
                Registra tu plan de titulación<br /><br />
                <Button>Registrar plan</Button>
              </Card>
            </Col>
            <Col span={ 6 }>
              <Card className={ 'options' } title='Proyecto de titulación' bordered={ false }>
                <div>
                  <CopyOutlined className={ 'big-icon' } />
                </div>
                <br />
                Sube tu proyecto de titulación<br /><br />
                <Button>Subir proyecto</Button>
              </Card>
            </Col>
            <Col span={ 6 }>
              <Card className={ 'options' } title='Defensa de grado' bordered={ false }>
                <div>
                  <FundProjectionScreenOutlined className={ 'big-icon' } />
                </div>
                <br />
                Mira la fecha de tu defensa de grado<br /><br />
                <Button>Ver fecha</Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className='resources'>

        <h1 className={ 'title2' }>
          Otros recursos:
        </h1>

        <Col span={ 24 }>

          <Row justify='center' className={ 'principal-options' }>
            <Col span={ 6 }>
              <Card className={ 'options-resources' } bordered={ false }>
                Mira posibles temas de titulación propuestos por los docentes de la ESFOT<br /><br />
                <Button>Ver temas</Button>
              </Card>
            </Col>
            <Col span={ 6 }>
              <Card className={ 'options-resources' } bordered={ false }>
                <br />
                Mira las normativas de titulación de la EPN<br /><br />
                <Button href={ 'https://esfot.epn.edu.ec/index.php/unidad-titulacion/normativa-proyectos-titulacion' }>Ver
                  normativas</Button>
              </Card>
            </Col>
            <Col span={ 6 }>
              <Card className={ 'options-resources' } bordered={ false }>
                <br />
                Mira los formatos de titulación de la EPN<br /><br />
                <Button href={ 'https://esfot.epn.edu.ec/index.php/solicitudes/documentos-solicitudes' }>Ver
                  formatos</Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default withAuth( HomeStudent );
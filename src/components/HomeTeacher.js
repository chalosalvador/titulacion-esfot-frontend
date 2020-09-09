import { Row, Card, Col, Button, Menu } from 'antd';
import React from 'react';
import '../styles/home-teacher.css';
import {
  BellOutlined, BulbOutlined, BarsOutlined, CheckOutlined, SelectOutlined, UserOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const HomeTeacher = () => {

  return (
    <div style={ { height: 1500 } }>
      <Menu mode='horizontal' className={ 'menus' } >
        <Menu.Item key='notification' icon={ <BellOutlined /> } />
        <SubMenu icon={ <UserOutlined /> }>
          <Menu.Item key='password'>Cambiar clave</Menu.Item>
          <Menu.Item key='logout'>Cerrar sesión</Menu.Item>
        </SubMenu>
      </Menu>
      <Card className={ 'statistics' }>
        <h1 className={ 'titles' }>Director</h1>
        <Card className={ 'statistics-content' } title='Tésis dirigidas' bordered={ false }>
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
      </Card>

      <Row className='principal'>

        <h1 className={ 'title' }>
          Panel Principal:
        </h1>

        <Col span={ 24 }>

          <Row justify='center' className={ 'principal-options' }>
            <Col span={ 6 }>
              <Card className={ 'options' } title='Director' bordered={ false }>
                <div>
                  <BulbOutlined className={ 'big-icon' } />
                </div>
                <br />
                Revisa los planes y proyectos de titulación que diriges<br /><br />
                <Button>Ver proyectos</Button>
              </Card>
            </Col>
            <Col span={ 6 }>
              <Card className={ 'options' } title='Jurado calificador' bordered={ false }>
                <div>
                  <CheckOutlined className={ 'big-icon' } />
                </div>
                <br />
                Revisa los proyectos como jurado<br /><br /><br />
                <Button>Ver proyectos</Button>
              </Card>
            </Col>
            <Col span={ 6 }>
              <Card className={ 'options' } title='Listado de temas' bordered={ false }>
                <div>
                  <BarsOutlined className={ 'big-icon' } />
                </div>
                <br />
                Registrar propuestas de temas<br /><br /><br />
                <Button>Registrar temas</Button>
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
                <br />
                Mira las normativas de titulación de la EPN<br /><br />
                <Button>Ver normativas</Button>
              </Card>
            </Col>
            <Col span={ 6 }>
              <Card className={ 'options-resources' } bordered={ false }>
                <br />
                Mira los formatos de titulación de la EPN<br /><br />
                <Button>Ver formatos</Button>
              </Card>
            </Col>
            <Col span={ 6 } />
          </Row>
        </Col>
      </Row>

      <Row className='commission'>

        <h1 className={ 'title3' }>
          Comisión titulación:
        </h1>

        <Col span={ 24 }>

          <Row justify='center' className={ 'principal-options' }>
            <Col span={ 6 }>
              <Card className={ 'options-commission' } title='Planes Comisión' bordered={ false }>
                <div>
                  <SelectOutlined className={ 'big-icon' } />
                </div>
                <br />
                Revisa los planes que llegan a la comisión de titulación<br /><br />
                <Button>Ver planes</Button>
              </Card>
            </Col>
            <Col span={ 6 } />
            <Col span={ 6 } />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeTeacher;
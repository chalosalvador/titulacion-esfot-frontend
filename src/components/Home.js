import React from 'react';
import { Typography, Row, Col, Button, Popover,Divider,Space,Card } from 'antd';
import '../styles/home.css'
import lapices from '../images/lapices.png';
import libros from '../images/fondolibros 1.png';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOutlined, CopyOutlined, LoginOutlined, QuestionCircleOutlined, UnorderedListOutlined
} from '@ant-design/icons';
import Routes from '../constants/routes';
const {Title} = Typography;

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const HomePage = () => {

  return (
    <>
      <Row className='first-part'>
        <Col span={24}>
          <DemoBox value={120}></DemoBox>
          <Title className='first-part'>TITULACIÓN <strong>ESFOT</strong></Title>

          {/*<Divider orientation="left"></Divider>*/}

          <p >Todo el proceso de titulación <br/>digitalizado y en un solo lugar</p>
          <Button type="primary" icon={<LoginOutlined  />} href={Routes.LOGIN}>Iniciar sesión</Button>
        </Col>
      </Row>
      <Row justify='center' className='second-part'>

        <Col span={24}>

          <h1 >ESTUDIANTES</h1>

            <Row justify='center'>
              <Col span={6}>

                <Card title="Listado de temas" bordered={false}>
                  <div>
                  <UnorderedListOutlined className={"big-icon"}/>
                  </div>
                  <br/>
                  Revisa los temas de titulación disponibles<br/><br/>
                  <Button type="primary" >Ver temas</Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Ingresar al sistema" bordered={false}>
                  <div>
                  <LoginOutlined className={"big-icon"}/>
                  </div>
                  <br/>
                  Empieza tu proceso de titulación<br/><br/>
                  <Button type="primary" href={Routes.LOGIN}>Empezar</Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Dudas adicionales" bordered={false}>
                  <div>
                  <QuestionCircleOutlined className={"big-icon"}/>
                  </div>
                  <br/>
                  Escríbenos, con gusto te ayudaremos<br/><br/>
                  <Button type="primary" >Enviar mail</Button>
                </Card>
              </Col>
            </Row>



        </Col>
      </Row>
      <Row justify={'center'} className='third-part'>
        <Col span={24}>

          <h1>PROFESORES</h1>
            <Row justify='center'>
              <Col span={6}>
                <Card title="Normativos" bordered={false} style={{margin: '0 auto'}}>
                 <div>
                  <BookOutlined className={"big-icon"}/>
                 </div>
                  <br/>
                  Mira los normativos más importantes<br/><br/>
                  <Button type="primary" href={'https://www.epn.edu.ec/index/normativos-docencia/'}>Ver normativos</Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Ingresar al sistema" bordered={false}>
                  <div>
                  <LoginOutlined className={"big-icon"}/>
                  </div>
                  <br/>
                  Ingresa al sistema<br/><br/><br/>
                  <Button type="primary" href={Routes.LOGIN}>Empezar</Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Documentación" bordered={false}>
                  <div>
                  <CopyOutlined className={"big-icon"}/>
                  </div>
                  <br/>
                  Mira los documentos más importantes<br/><br/>
                  <Button type="primary" href={'https://esfot.epn.edu.ec/index.php/solicitudes/documentos-solicitudes'}>Ver documentos</Button>
                </Card>
              </Col>

            </Row>
          <br/>

        </Col>
      </Row>


    </>
  );
};


export default HomePage;

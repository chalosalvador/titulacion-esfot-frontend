import { Comment, Row, Card, Steps, Col, Button } from 'antd';
import React, { useState } from 'react';
import '../styles/home-student.css';
import { BellOutlined, CopyOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import {
  FileTextOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const HomeStudent = () => (

  <div style={{height:1007}}>
    <BellOutlined className={ 'notification' } />
    <a href={ '#' } className={ 'logout' }>
      Cerrar Sesión
    </a>
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
              <Button>Ver normativas</Button>
            </Card>
          </Col>
          <Col span={ 6 }>
            <Card className={ 'options-resources' } bordered={ false }>
              <br />
              Mira las normativas de titulación de la EPN<br /><br />
              <Button>Ver temas</Button>
            </Card>
          </Col>
          <Col span={ 6 }>
            <Card className={ 'options-resources' } bordered={ false }>
              <br />
              Mira los formatos de titulación de la EPN<br /><br />
              <Button>Ver formatos</Button>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default HomeStudent;
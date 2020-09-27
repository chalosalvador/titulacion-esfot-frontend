import React from 'react';
import { Steps, Typography } from 'antd';

const { Step } = Steps;
const { Title } = Typography;

const StepsSider = () => {

  return (
    <>
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
    </>
  );

};

export default StepsSider;
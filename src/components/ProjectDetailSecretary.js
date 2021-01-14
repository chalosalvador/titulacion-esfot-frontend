import React, { useState } from 'react';
import { Form, Row, Typography, Input, Collapse, Checkbox, Switch, Col, message } from 'antd';
import {
  BellOutlined, HomeOutlined, LoadingOutlined, LogoutOutlined, SearchOutlined, UserOutlined
} from '@ant-design/icons';
import { usePlanContent } from '../data/usePlan';
import API from '../data';

const { Title } = Typography;
const { Panel } = Collapse;


const ProjectDetailSecretary = ( { id } ) => {
  console.log( 'id', id );

  const [ approveMethodology, setApproveMethodology ] = useState( null );
  const [ approve80, setApprove80 ] = useState( null );


  const {
    plan,
    isLoading
  } = usePlanContent( id );

  if( isLoading ) {
    return <h1>loading...</h1>;
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  console.log( 'plan', plan );
  const onFinish = ( values ) => {
    console.log( values );
  };
  const callback = ( key ) => {
    console.log( key );
  };
  const onChange = async( e ) => {
    console.log( `checked = ${ e.target.checked }` );
    setApproveMethodology( true );
    let planData = {};
    planData = {
      ...plan,
      status: 'san_curriculum_1'
    };
    if( e.target.checked && approve80 ) {
      try {
        await API.post( `/projects/${ id }`, planData ); // put data to server
        message.success( 'Cambios guardados' );
      } catch( e ) {
        console.log( 'ERROR', e );
        message.error( `No se guardaron los datos:¨${ e }` );
      }
    }
  };
  const onChangeSwitch = async( checked ) => {
    console.log( `switch to ${ checked }` );
    setApprove80( true );
    let planData = {};
    planData = {
      ...plan,
      status: 'san_curriculum_1'
    };
    if( checked && approveMethodology ) {
      try {
        await API.post( `/projects/${ id }`, planData ); // put data to server
        message.success( 'Cambios guardados' );
      } catch( e ) {
        console.log( 'ERROR', e );
        message.error( `No se guardaron los datos:¨${ e }` );
      }
    }
  };

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


  return (
    <>
      <Title level={ 4 }
             style={ {
               color: '#034c70',
               marginLeft: 30
             } }>Datos Generales</Title>
      <Form { ...layout } name='nest-messages' onFinish={ onFinish } validateMessages={ validateMessages }>
        <Form.Item name={ [ 'user', 'name' ] } label='Director' rules={ [ { required: true } ] }>
          <Input />
        </Form.Item>
        <Form.Item name={ [ 'user', 'email' ] } label='Coodirector' rules={ [ { type: 'email' } ] }>
          <Input />
        </Form.Item>
        <Form.Item name={ [ 'user', 'website' ] } label='Compañero de titulación'>
          <Input />
        </Form.Item>
        <Form.Item name={ [ 'user', 'introduction' ] } label='Tipo de proyecto'>
          <Input />
        </Form.Item>
        <Form.Item name={ [ 'user', 'introduction' ] } label='Línea de investigación'>
          <Input />
        </Form.Item>
        <Form.Item name={ [ 'user', 'introduction' ] } label='Área de investigación'>
          <Input />
        </Form.Item>
        <Form.Item name={ [ 'user', 'introduction' ] } label='Título'>
          <Input.TextArea />
        </Form.Item>
      </Form>
      <Collapse defaultActiveKey={ [ '1' ] } onChange={ callback }>
        <Panel header='Curriculum saneado 1 (para ingreso plan de titulación)' key='1'>
          <Row>
            <Col>
              <Checkbox onChange={ onChange }>Está tomando o ya tiene aprobado Metodología de la
                Investigación</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch onChange={ onChangeSwitch } />
              <label>cuenta con más del 80% de materias aprobadas</label>
            </Col>
          </Row>
        </Panel>
        <Panel header='Registro de plan en Saew' key='2'>
          <p>{ text }</p>
        </Panel>
        <Panel header='Curriculum saneado 2' key='3'>
          <p>{ text }</p>
        </Panel>
        <Panel header='Requisitos para declarar apta defensa oral' key='4'>
          <p>{ text }</p>
        </Panel>
      </Collapse>
    </>
  );
};

export default ProjectDetailSecretary;

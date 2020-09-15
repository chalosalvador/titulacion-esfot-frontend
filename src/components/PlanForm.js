import { Col, Row, Card, Steps, Form, Input, Upload, Button, Menu, Select } from 'antd';
import React, { useState } from 'react';
import '../styles/plan-form.css';
import {
  BellOutlined, LoadingOutlined, LoginOutlined, LogoutOutlined, UserOutlined, UploadOutlined, SendOutlined
} from '@ant-design/icons';
import {} from '@ant-design/icons';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';

const { Step } = Steps;
const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;

const PlanForm = () => {

  let location = useLocation();

  const [ menuState, setMenuState ] = useState( {
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );

  const layout = {
    labelCol: { span: 14 },
    wrapperCol: { span: 10 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = values => {
    console.log( values );
  };

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
    <div style={ { height: 1250 } }>
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
        <Col span={18}>
          <Row>
            <h1 className={ 'title' }>
              Plan de titulación:
            </h1>
          </Row>

          <Row>
            <h5 className={ 'subtitle' }>
              Datos Generales
            </h5>
          </Row>

          <Row justify='center'>
            <Form { ...layout }
                  name='nest-messages'
                  onFinish={ onFinish }
                  validateMessages={ validateMessages }>
              <Form.Item name={ [ 'user', 'name' ] } label='Seleccione su director' rules={ [ { required: true } ] }>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
              <Form.Item name={ [ 'user', 'email' ] } label='Seleccione su co-director' rules={ [ { type: 'email' } ] }>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
              <Form.Item name={ [ 'user', 'age' ] } label='Seleccione compañero'>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
              <Form.Item name={ [ 'user', 'website' ] } label='Tipo de proyecto' rules={ [ { required: true } ] }>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
              <Form.Item name={ [ 'user', 'introduction' ] } label='Línea de investigación' rules={ [ { required: true } ] }>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
              <Form.Item name={ [ 'user', 'introduction' ] } label='Área de investigación' rules={ [ { required: true } ] }>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Form>
          </Row>

          <Row>
            <h5 className={ 'subtitle' }>
              Plan
            </h5>
          </Row>

          <Row justify='center'>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
              <Form.Item name={['user', 'name']} label="Título" rules={[{ required: true }]}>
                <TextArea
                  size={25}
                  placeholder="Máximo 15 palabras"
                  autoSize={{ minRows: 1, maxRows: 4 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'email']} label="Planteamiento del problema" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'age']} label="Justificación" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'website']} label="Hipótesis" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'introduction']} label="Objetivo General" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'name']} label="Objetivos Específicos" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'name']} label="Metodología" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'name']} label="Plan de trabajo" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item name={['user', 'name']} label="Cronograma" rules={[{ required: true }]}>
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item name={['user', 'name']} label="Bibliografía" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className={'submit'} htmlType="submit">
                  <SendOutlined />
                  Enviar plan
                </Button>
              </Form.Item>
            </Form>

          </Row>

        </Col>
      </Row>

    </div>
  );
};

export default withAuth( PlanForm );
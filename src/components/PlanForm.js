import {
  Col, Row, Card, Steps, Form, Input, Upload, Button, Menu, Select, Layout, PageHeader, Dropdown, Typography, message,
  Modal, Image
} from 'antd';
import React, { useState } from 'react';
import '../styles/plan-form.css';
import {
  BellOutlined, LoadingOutlined, LogoutOutlined, UserOutlined, PlusOutlined, SendOutlined, HomeOutlined,
  ExclamationCircleOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import {} from '@ant-design/icons';
import Routes from '../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';
import { useProject } from '../data/useProjects';
import { useTeachers } from '../data/useTeachers';
import API from '../data';

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const { Sider } = Layout;
const { confirm } = Modal;

const getBase64 = ( file, callback ) => {
  console.log( 'file', file );
  const reader = new FileReader();
  reader.addEventListener( 'load', () => callback( reader.result ) );
  reader.readAsDataURL( file );
};

const PlanForm = ( {
  visible,
  update,
} ) => {

  const [ form ] = Form.useForm();

  const getProjectData = () => {
    const formData = form.getFieldsValue();
    if( formData.bibliography !== undefined && formData.general_objective !== undefined && formData.hypothesis !== undefined && formData.justification !== undefined && formData.knowledge_area !== undefined && formData.methodology !== undefined && formData.problem !== undefined && formData.project_type !== undefined && formData.research_line !== undefined && formData.specifics_objectives !== undefined && formData.work_plan !== undefined ) {
      return true;
    }
  };

  let location = useLocation();
  const { projects, isError, isLoading } = useProject();
  const { teachers } = useTeachers();
  const [ imageUrl, setImageUrl ] = useState( null );
  const [ fileList, setFileList ] = useState( [] );
  const [ sending, setSending ] = useState( false );
  const [ isFinished, setIsFinished ] = useState( () => getProjectData );

  console.log( projects, isError );

  const [ menuState, setMenuState ] = useState( {
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };

  const validateMessages = {
    required: '${label} es requerido!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onCreate = async( values ) => {

    console.log( 'Received values of form: ', values );
    setSending( true );

    // form.validateFields()
    //   .then( async( values ) => {
    //
    //     console.log( 'values', values );

    const data = new FormData();
    data.append( 'codirector', values.codirector
      ? values.codirector
      : '' );
    data.append( 'partner', values.partner
      ? values.partner
      : '' );
    data.append( 'project_type', values.project_type
      ? values.project_type
      : '' );
    data.append( 'research_line', values.research_line
      ? values.research_line
      : '' );
    data.append( 'knowledge_area', values.knowledge_area
      ? values.knowledge_area
      : '' );
    data.append( 'title', values.title );
    data.append( 'problem', values.problem
      ? values.problem
      : '' );
    data.append( 'justification', values.justification
      ? values.justification
      : '' );
    data.append( 'hypothesis', values.hypothesis
      ? values.hypothesis
      : '' );
    data.append( 'general_objective', values.general_objective
      ? values.general_objective
      : '' );
    data.append( 'specifics_objectives', values.specifics_objectives
      ? values.specifics_objectives
      : '' );
    data.append( 'methodology', values.methodology
      ? values.methodology
      : '' );
    data.append( 'work_plan', values.work_plan
      ? values.work_plan
      : '' );
    data.append( 'schedule', values.schedule
      ? values.schedule[ 0 ]
      : 'https://lorempixel.com/400/300/' );
    data.append( 'bibliography', values.bibliography
      ? values.bibliography
      : '' );
    data.append( 'teacher_id', values.teacher_id );

    console.log( 'DATOS', values );

    try {
      await API.post( '/students/projects', data ); // post data to server
      setImageUrl( null );
      setSending( false );
      message.success( 'Cambios guardados correctamente!' );
    } catch( e ) {
      console.log( 'ERROR', e );
      message.error( `No se guardaron los datos:¨${ e }` );
    }

    //   } ).catch( info => {
    //   console.log( 'Validate Failed:', info );
    // } );
  };

  const onUpdate = async( values ) => {
    setSending( true );
    const data = { ...values };

    console.log( 'DATOS', data );

    try {
      await API.post( `/projects/${ projects[ 0 ].id }`, data ); // put data to server
      setSending( false );
      message.success( 'Cambios guardados correctamente!' );
    } catch( e ) {
      console.log( 'ERROR', e );
      message.error( `No se guardaron los datos:¨${ e }` );
    }
  };

  const onCompleteForm = ( formName, info ) => {
    const formData = form.getFieldsValue();
    if( formData.bibliography !== undefined && formData.general_objective !== undefined && formData.hypothesis !== undefined && formData.justification !== undefined && formData.knowledge_area !== undefined && formData.methodology !== undefined && formData.problem !== undefined && formData.project_type !== undefined && formData.research_line !== undefined && formData.specifics_objectives !== undefined && formData.work_plan !== undefined ) {
      setIsFinished( true );
    }
    console.log( 'FORM', formData );
  };

  const modal = () => {
    confirm( {
      icon: <ExclamationCircleOutlined />,
      title: '¿Estás seguro de mandar el plan?',
      content: 'Una vez enviado le llegará a tu director',
      okText: 'Si',
      cancelText: 'No',
      onOk() {
        onFinish();
      },
      onCancel() {
        console.log( 'Cancel' );
      },
      okButtonProps: { style: { backgroundColor: '#034c70' } }
    } );
  };

  const onFinish = async() => {
    const data = form.getFieldsValue();
    let dataToSent = {
      ...data,
      status: 'plan_sent'
    };
    try {
      await API.post( `/projects/${ projects[ 0 ].id }`, dataToSent ); // put data to server
      setSending( false );
      confirm( {
        icon: <CheckCircleOutlined />,
        title: <Title level={ 3 } style={ { color: '#034c70' } }>¡Buen trabajo!</Title>,
        content:
          <>
            <Row justify='center'>
              <Col>
                <Image src='boy.png' width={ 100 } /><Image src='girl.png' width={ 100 } />
              </Col>
            </Row>

            <Row>
              <Col>
                <p style={ { color: '#034c70' } }>
                  Tu plan ha sido enviado.
                  <br />
                  Ahora deberá ser aprobado por tu director.
                </p>
              </Col>
            </Row>
          </>,
        okText: 'Entendido',
        okButtonProps: {
          href: Routes.HOME,
          style: {
            backgroundColor: '#034c70',
            marginRight: 125
          }
        },
        cancelButtonProps: { hidden: true }
      } );
    } catch( e ) {
      console.log( 'ERROR', e );
      message.error( `No se guardaron los datos:¨${ e }` );
    }

  };

  const handleClick = ( e ) => {
    console.log( 'click ', e );
    setMenuState( {
      ...menuState,
      current: e.key
    } );
  };

  const normPhotoFile = e => {
    console.log( 'Upload event:', e );
    const file = e.file;
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if( !isJpgOrPng ) {
      message.error( 'La imagen debe tener formato JPG o PNG' );
      setFileList( [] );
      setImageUrl( null );
      return null;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if( !isLt2M ) {
      message.error( 'La imagen debe ser menor a 2MB' );
      setFileList( [] );
      setImageUrl( null );
      return null;
    }

    if( file.status === 'removed' ) {
      setFileList( [] );
      setImageUrl( null );
      return null;
    }

    getBase64( e.file, imageUrl => setImageUrl( imageUrl ) );

    if( Array.isArray( e ) ) {
      return e;
    }

    console.log( 'e.file', e.file );
    console.log( 'e.fileList', e.fileList );
    setFileList( [ file ] );

    return e && [ e.file ];
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

  if( isLoading ) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Layout>
        <Sider theme='light'
               width={ 300 }
               style={ {
                 backgroundColor: '#dddddd',
                 padding: 40
               } }>
          <Title level={ 3 } style={ { color: '#034c70' } }>Progreso</Title>
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
                      title={ <Title level={ 3 } style={ { color: '#034c70' } }>Plan de titulación:</Title> }
                      extra={ [
                        <Button key='home' type='text' style={ { color: '#034c70' } }>
                          <Link to={ Routes.HOME }>
                            <HomeOutlined />
                          </Link>
                        </Button>,
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

          <Row>
            <Col span={ 24 }>
              <Title level={ 4 }
                     style={ {
                       color: '#034c70',
                       marginLeft: 30
                     } }>Datos Generales</Title>
              <Form.Provider onFormChange={ onCompleteForm }>
                <Form { ...layout }
                      name='nest-messages'
                      onFinish={ projects.length > 0
                        ? onUpdate
                        : onCreate }
                      initialValues={ projects.length > 0
                        ? projects[ 0 ]
                        : {} }
                      validateMessages={ validateMessages }
                      form={ form }
                >
                  <Row justify='center'>
                    <Col>
                      <Form.Item name='teacher_id'
                                 label='Seleccione su director'
                                 rules={ [ { required: true } ] }>
                        <Select style={ { width: 300 } } loading={ isLoading } disabled={ projects.length > 0 }>
                          {
                            teachers && teachers.map( ( teacher, index ) =>
                              <Option value={ teacher.id } key={ index }>{ teacher.name }</Option>
                            )
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item name='codirector'
                                 label='Seleccione su co-director'>
                        <Input
                          style={ { width: 300 } }
                          placeholder='Nombre del co-director'
                        />
                      </Form.Item>
                      <Form.Item name='partner' label='Seleccione su compañero'>
                        <Select style={ { width: 300 } }>
                          <Option value='jack'>Jack</Option>
                          <Option value='lucy'>Lucy</Option>
                          <Option value='Yiminghe'>yiminghe</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name='project_type' label='Tipo de proyecto'>
                        <Select style={ { width: 300 } }>
                          <Option value='areaInvestigation'>Investigación de campo</Option>
                          <Option value='documentalInvestigation'>Investigación documental</Option>>
                        </Select>
                      </Form.Item>
                      <Form.Item name='research_line'
                                 label='Línea de investigación'>
                        <Select defaultValue='Seleccione' style={ { width: 300 } }>
                          <Option value='jack'>Jack</Option>
                          <Option value='lucy'>Lucy</Option>
                          <Option value='Yiminghe'>yiminghe</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name='knowledge_area'
                                 label='Área de investigación'>
                        <Select defaultValue='Seleccione' style={ { width: 300 } }>
                          <Option value='jack'>Jack</Option>
                          <Option value='lucy'>Lucy</Option>
                          <Option value='Yiminghe'>yiminghe</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Title justify={ 'left' }
                             level={ 4 }
                             style={ {
                               color: '#034c70',
                               marginLeft: 30
                             } }>Plan</Title>
                    </Col>
                  </Row>

                  <Row justify={ 'center' }>
                    <Col>
                      <Form.Item name='title' label='Título' rules={ [ { required: true } ] }>
                        <TextArea
                          style={ { width: 300 } }
                          placeholder='Máximo 15 palabras'
                          autoSize={ {
                            minRows: 1,
                            maxRows: 4
                          } }
                        />
                      </Form.Item>
                      <Form.Item name='problem'
                                 label='Planteamiento del problema'>
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item name='justification' label='Justificación'>
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item name='hypothesis' label='Hipótesis'>
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item name='general_objective'
                                 label='Objetivo General'
                      >
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item name='specifics_objectives' label='Objetivos Específicos'>
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item name='methodology' label='Metodología'>
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item name='work_plan' label='Plan de trabajo'>
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item name='schedule' label='Cronograma' getValueFromEvent={ normPhotoFile }>
                        <Upload name='files'
                                accept='image/jpeg,image/png'
                                listType='picture-card'
                                multiple={ false }
                                showUploadList={ false }
                                beforeUpload={ () => false }
                                fileList={ fileList }
                        >
                          { imageUrl
                            ? <img src={ imageUrl } alt='Foto' style={ { width: '80px' } } />
                            : <div>
                              <PlusOutlined />
                              <div className='ant-upload-text'>Subir imagen</div>
                            </div> }
                        </Upload>
                      </Form.Item>
                      <Form.Item name='bibliography' label='Bibliografía'>
                        <TextArea style={ { width: 300 } }
                                  placeholder='Autosize height with minimum and maximum number of lines'
                                  autoSize={ {
                                    minRows: 2,
                                    maxRows: 6
                                  } }
                        />
                      </Form.Item>
                      <Form.Item wrapperCol={ {
                        ...layout.wrapperCol,
                        offset: 8
                      } }>
                        <Button className={ 'submit' } htmlType='submit' loading={ sending }>
                          Guardar plan
                        </Button>
                      </Form.Item>
                      <Form.Item wrapperCol={ {
                        ...layout.wrapperCol,
                        offset: 8
                      } }>
                        <Button className={ 'submit' }
                                onClick={ modal }
                                disabled={ !isFinished }>
                          <SendOutlined /> Enviar plan
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Form.Provider>
            </Col>
          </Row>

        </Layout>
      </Layout>

    </>
  );
};

export default withAuth( PlanForm );
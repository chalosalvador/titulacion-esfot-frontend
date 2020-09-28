import { Row, Card, Col, Button, Menu } from 'antd';
import React, { useState } from 'react';
import '../styles/teacher-panel.css';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import { useProjectsList } from '../data/useProjectsList';
import ShowError from './ShowError';
import Loading from './Loading';
import Empty from 'antd/es/empty';


const TeacherPanel = () => {

  // const [ menuState, setMenuState ] = useState( {
  //   current: location.pathname, // set the current selected item in menu, by default the current page
  //   collapsed: false,
  //   openKeys: []
  // } );
  // const handleClick = ( e ) => {
  //   console.log( 'click ', e );
  //   setMenuState( {
  //     ...menuState,
  //     current: e.key
  //   } );
  // };
  //
  // React.useEffect( () => {
  //   setMenuState( {
  //     ...menuState,
  //     current: location.pathname
  //   } );
  // }, [ location, isAuthenticated ] );
  const { teachersProjects, meta, isLoading, isError } = useProjectsList();

  const columns = [
    {
      title: 'Nombre del Estudiante',
      dataIndex: 'student_name',
      key: 'student_name'
    },
    {
      title: 'Tema',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = '';
        let name = '';
        {
          if( status === 'plan_sent' ) {
            color = 'blue';
            name = 'Por revisar';
          }
          return (
            <Tag color={ color } key={ status }>
              { name.toUpperCase() }
            </Tag>
          );
        }
      },
    },
  ];


  let pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: false
  };
  if( isLoading ) {
    return <Loading />;
  }

  if( isError ) {
    return <ShowError error={ isError } />;
  }

  console.log( teachersProjects );


  const data = teachersProjects.map( ( project, index ) => {
    return {
      key: index,
      title: project.title,
      student_name: project[ 'students' ][ 0 ][ 'name' ],
      status: project.status
    };
  } );

  if( meta ) {
    pagination = {
      current: meta.current_page,
      pageSize: meta.per_page,
      total: meta.total,
      showSizeChanger: false
    };
  }

  // console.log("Pilas",getDataSource());

  return <Table
    dataSource={ data }
    columns={ columns }
  />;

  // <div style={ { height: 1500 } }>
  //   {/*<Menu mode='horizontal' className={ 'menus' } onClick={ handleClick }>*/}
  //     <Menu mode='horizontal' className={ 'menus' }>
  //     <Menu.Item key='notification' icon={ <BellOutlined /> } />
  //     {
  //       isAuthenticated
  //         ? <SubMenu icon={ <UserOutlined /> } title={ currentUser && currentUser.name }>
  //           <Menu.Item key='password'>Cambiar clave</Menu.Item>
  //
  //           <Menu.Item key={ Routes.LOGIN }>
  //             <Link to={ Routes.LOGOUT } className='logout-link'>
  //               {
  //                 isCheckingAuth
  //                   ? <LoadingOutlined />
  //                   : <><LogoutOutlined /> Cerrar sesión </>
  //               }
  //             </Link>
  //           </Menu.Item>
  //         </SubMenu>
  //         : <Menu.Item key={ Routes.LOGIN }>
  //           <Link to={ Routes.LOGIN }>
  //             {
  //               isCheckingAuth
  //                 ? <LoadingOutlined />
  //                 : <><LoginOutlined /> Ingresar</>
  //             }
  //           </Link>
  //         </Menu.Item>
  //     }
  //   </Menu>
  //   <Card className={ 'statistics' }>
  //     <h1 className={ 'titles' }>Director</h1>
  //     <Card className={ 'statistics-content' } title='Tesis dirigidas' bordered={ false }>
  //       <p className={ 'numbers' }>10</p>
  //     </Card>
  //
  //     <Card className={ 'statistics-content2' } title='Planes por revisar' bordered={ false }>
  //       <p className={ 'numbers' }>2</p>
  //     </Card>
  //
  //     <Card className={ 'statistics-content2' } title='Proyectos por revisar' bordered={ false }>
  //       <p className={ 'numbers' }>2</p>
  //     </Card>
  //
  //     <h1 className={ 'jury' }>Jurado</h1>
  //
  //     <Card className={ 'jury-statistics' } title='Proyectos por revisar' bordered={ false }>
  //       <p className={ 'numbers' }>1</p>
  //     </Card>
  //   </Card>
  //
  //   <Row className='principal'>
  //
  //     <h1 className={ 'title' }>
  //       Director
  //     </h1>
  //
  //     <h1 className={'subtitle1'}>
  //       Planes y proyectos de titulación
  //     </h1>
  //
  //     <br />
  //     <Search className={'searchInput'} placeholder="Búsqueda de tema o estudiante(s)" enterButton />
  //     <br />
  //
  //     <Col span={ 24 }>
  //
  //       <Row justify='center' >
  //         <Table
  //                dataSource={getDataSource()}
  //                columns={columns}
  //                locale={
  //                  {
  //                    emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
  //                                      description={<span>No hay proyectos ni planes registrados</span>}
  //                    />
  //                  }
  //                }
  //         />;
  //       </Row>
  //     </Col>
  //   </Row>
  //
  //   <Row className='resources'>
  //
  //     <h1 className={ 'title2' }>
  //       Otros recursos:
  //     </h1>
  //
  //     <Col span={ 24 }>
  //
  //       <Row justify='center' className={ 'principal-options' }>
  //         <Col span={ 6 }>
  //           <Card className={ 'options-resources' } bordered={ false }>
  //             <br />
  //             Mira las normativas de titulación de la EPN<br /><br />
  //             <Button
  // href={'https://esfot.epn.edu.ec/index.php/unidad-titulacion/normativa-proyectos-titulacion'}>Ver
  // normativas</Button> </Card> </Col> <Col span={ 6 }> <Card className={ 'options-resources' } bordered={ false }>
  // <br /> Mira los formatos de titulación de la EPN<br /><br /> <Button
  // href={'https://esfot.epn.edu.ec/index.php/solicitudes/documentos-solicitudes'}>Ver formatos</Button> </Card>
  // </Col> <Col span={ 6 } /> </Row> </Col> </Row>  <Row className='commission'>  <h1 className={ 'title3' }> Comisión
  // titulación: </h1>  <Col span={ 24 }>  <Row justify='center' className={ 'principal-options' }> <Col span={ 6 }>
  // <Card className={ 'options-commission' } title='Planes Comisión' bordered={ false }> <div> <SelectOutlined
  // className={ 'big-icon' } /> </div> <br /> Revisa los planes que llegan a la comisión de titulación<br /><br />
  // <Button>Ver planes</Button> </Card> </Col> <Col span={ 6 } /> <Col span={ 6 } /> </Row> </Col> </Row> </div>

};

export default (TeacherPanel);
import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import { useProjectsList } from "../data/useProjectsList";
import ShowError from "./ShowError";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/Auth";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import PlanReview from "./PlansReviewCollapse";

const { Title } = Typography;
const { Link } = Typography;

const TeacherPanel = () => {
  const [state, setState] = useState({
    idPlan: null,
    status: null,
    showPlanReview: false,
  });
  let location = useLocation();
  const { isAuthenticated } = useAuth();
  const { teachersProjects, meta, isLoading, isError } = useProjectsList();

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: [],
  });
  //
  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname,
    });
  }, [location, isAuthenticated]);

  const columns = [
    {
      title: "Nombre del Estudiante",
      dataIndex: "student_name",
      key: "student_name",
      width: 250,
      ...SearchColumnFilter("student_name"),
    },
    {
      title: "Tema",
      dataIndex: "title",
      key: "title",
      width: 800,
      ...SearchColumnFilter("title"),
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 125,
      render: (status) => {
        let color = "";
        let name = "";
        {
          switch (status) {
            case "plan_saved":
              color = "orange";
              name = "Plan en desarrollo";
              break;

            case "plan_sent":
              color = "blue";
              name = "Por revisar";
              break;

            case "plan_corrections_done":
              color = "blue";
              name = "Correcciones de plan realizadas";
              break;

            case "plan_review_teacher":
              color = "orange";
              name = "Correcciones enviadas";
              break;

            case "plan_approved_director":
              color = "green";
              name = "Plan aprobado";
              break;

            case "plan_review_commission":
              color = "orange";
              name = "Correcciones de comisión enviadas";
              break;

            case "plan_corrections_done2":
              color = "blue";
              name = "Por revisar por comisión";
              break;

            case "plan_approved_commission":
              color = "green";
              name = "Plan aprobado por comisión";
              break;

            case "san_curriculum_1":
              color = "purple";
              name = "Curriculum saneado 1";
              break;

            case "san_curriculum_2":
              color = "purple";
              name = "Curriculum saneado 2";
              break;

            case "plan_rejected":
              color = "red";
              name = "Plan rechazado";
              break;

            case "project_uploaded":
              color = "cyan";
              name = "PDF por revisar";
              break;

            case "project_corrections_done":
              color = "cyan";
              name = "correcciones de PDF realizadas";
              break;

            case "project_review_teacher":
              color = "magenta";
              name = "Correcciones de PDF enviadas";
              break;

            case "project_approved_director":
              color = "green";
              name = "PDF aprobado";
              break;

            case "tribunal_assigned":
              color = "lime";
              name = "Tribunal asignado";
              break;

            case "project_graded":
              color = "yellow";
              name = "Proyecto calificado";
              break;

            case "project_corrections_done_2":
              color = "cyan";
              name = "Correcciones de PDF realizadas (tribunal)";
              break;

            case "project_approved_send":
              color = "cyan";
              name = "Aprobado para envío";
              break;

            case "test_defense_apt":
              color = "green";
              name = "Apto para defensa oral";
              break;

            case "date_defense_assigned":
              color = "geekblue";
              name = "Fecha de defensa asignada";
              break;

            case "project_completed":
              color = "gold";
              name = "Proyecto completado";
              break;

            case "project_rejected":
              color = "red";
              name = "Proyecto rechazado";
              break;

            default:
              break;
          }
          return (
            <Tag color={color} key={status}>
              {name.toUpperCase()}
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
    showSizeChanger: false,
  };
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowError error={isError} />;
  }

  console.log(teachersProjects);

  const data = teachersProjects.map((project, index) => {
    return {
      key: index,
      title: project.title,
      student_name: project.student_name,
      status: project.status,
      id: project.id,
    };
  });

  if (meta) {
    pagination = {
      current: meta.current_page,
      pageSize: meta.per_page,
      total: meta.total,
      showSizeChanger: false,
    };
  }

  let content = "";
  let titleTable = "";
  if (!state.showPlanReview) {
    titleTable = (
      <Title level={3} style={{ color: "#034c70" }}>
        Planes y proyectos de titulación
      </Title>
    );

    content = (
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(data) => data.id}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              setState({
                idPlan: record.id,
                status: record.status,
                showPlanReview: true,
              });
            },
          };
        }}
      />
    );
  } else {
    content = <PlanReview planId={state.idPlan} status={state.status} />;
  }

  // console.log("Pilas",getDataSource());

  return (
    <>
      <Row>
        <Col>
          <Title
            level={3}
            style={{
              color: "#034c70",
              marginLeft: -30,
            }}
          >
            Director:
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>{titleTable}</Col>
      </Row>
      <Row>
        <Col>{content}</Col>
      </Row>
    </>
  );

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

export default TeacherPanel;

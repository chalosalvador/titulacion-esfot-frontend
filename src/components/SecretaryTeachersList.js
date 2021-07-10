import {Button, Col, Layout, Menu, Row, Typography, Modal} from "antd";
import React, {useEffect, useState} from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import {LoadingOutlined, LogoutOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../providers/Auth";
import Routes from "../constants/routes";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import {useTeachers} from "../data/useTeachers";
import Loading from "./Loading";
import ShowError from "./ShowError";
import SecretaryAddTeacherForm from "./SecretaryAddTeacherForm";
import SecretaryUpdateTeacherForm from "./SecretaryUpdateTeacherForm";

const {Title} = Typography;

const SecretaryTeachersList = () => {
    let location = useLocation();
    const {isAuthenticated, isCheckingAuth, currentUser} = useAuth();
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
    const {teachers, isLoading, isError, mutate} = useTeachers();
    const [updateTeacher, setUpdateTeacher] = useState();
    const [updateTeacherId, setUpdateTeacherId] = useState();

    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: false,
        openKeys: [],
    });


    // Handles modal agregar profesor

    const handleClick = (e) => {
        console.log("click ", e);
        setMenuState({
            ...menuState,
            current: e.key,
        });
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    // Handles modal editar profesor

    const showEditModal = () => {
        setVisibleEdit(true);
    };

    const handleEditOk = () => {
        setConfirmLoadingEdit(true);
        setTimeout(() => {
            setVisibleEdit(false);
            setConfirmLoadingEdit(false);
        }, 2000);
    };

    const handleEditCancel = () => {
        console.log('Clicked cancel button');
        setVisibleEdit(false);
    };

    React.useEffect(() => {
        setMenuState({
            ...menuState,
            current: location.pathname,
        });
    }, [location, isAuthenticated]);

    // Columnas y datos para la tabla

    const columns = [
        {
            title: "Profesor",
            dataIndex: "name",
            key: "name",
            width: 550,
            ...SearchColumnFilter("name"),
        },
        {
            title: "Carrera",
            dataIndex: "career",
            key: "career",
            width: 250,
            ...SearchColumnFilter("career"),
        },
        {
            title: "Correo Electrónico",
            dataIndex: "email",
            key: "email",
            width: 550,
            ...SearchColumnFilter("email"),
        }
    ];

    const userMenu = (
        <Menu onClick={handleClick}>
            <Menu.Item key="password">Cambiar clave</Menu.Item>
            <Menu.Item key={Routes.LOGIN}>
                <Link to={Routes.LOGOUT} className="logout-link">
                    {isCheckingAuth ? (
                        <LoadingOutlined/>
                    ) : (
                        <>
                            <LogoutOutlined/> Cerrar sesión{" "}
                        </>
                    )}
                </Link>
            </Menu.Item>
        </Menu>
    );

    let pagination = {
        current: 1,
        pageSize: 10,
        total: 10,
        showSizeChanger: false,
    };
    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }


    //Consumo de datos de la base
    const getTeachersData = teachers.map((teacher) => {
        return {
            key: teacher.id,
            originalData: teacher,
            name: teacher.name,
            career: teacher.career,
            email: teacher.email,
            schedule: teacher.schedule
        };
    });

    console.log("Profesores", getTeachersData);

    const onSearch = (value) => console.log(value);
    let content = "";
    let titleTable = "";
    let titleModal = "";
    let titleModalEdit = "";

    titleTable = (
        <Title level={3} style={{color: "#034c70", fontSize: 50}}>
            Listado de profesores
        </Title>
    );

    content = (
        <Table
            dataSource={getTeachersData}
            columns={columns}
            rowKey={(data) => data.id}
            onRow={(record, index) => {
                return {
                    onClick: (event) => {
                        event.stopPropagation();
                        setVisibleEdit(true);
                        setUpdateTeacher(record.originalData);
                        setUpdateTeacherId(record.key);
                    },
                };
            }}
            style={{overflowX: 'auto'}}
        />
    );

    titleModal = (
        <Title level={3} style={{color: "#034c70"}}>
            Agregar profesor
        </Title>
    )

    titleModalEdit = (
        <Title level={3} style={{color: "#034c70"}}>
            Editar profesor
        </Title>
    )

    return (
        <>
            <Row>
                <Col>{titleTable}</Col>
            </Row>
            <Row>
                <Button style={{backgroundColor: "#034c70", color: "white"}} onClick={showModal}><PlusOutlined/>Agregar
                    profesor</Button>
            </Row>
            <br>
            </br>
            <br>
            </br>
            <Row>
                <div style={{display: "flex", justifyContent: "center"}}><Col>{content}</Col></div>
            </Row>

            <Modal
                title={titleModal}
                visible={visible}
                className='schedule-modal'
                confirmLoading={confirmLoading}
                centered
                footer={null}
                closable={true}
                destroyOnClose={true}
                onCancel={() => setVisible(false)}
            >
                <SecretaryAddTeacherForm closeModal={() => setVisible(false)}/>
            </Modal>


            <Modal
                title={titleModalEdit}
                visible={visibleEdit}
                className='schedule-modal'
                confirmLoading={confirmLoading}
                footer={null}
                closable={true}
                destroyOnClose={true}
                onCancel={() => setVisibleEdit(false)}
            >
                <SecretaryUpdateTeacherForm teacher={updateTeacher}
                                            teacherId={updateTeacherId}
                                            closeModal={() => setVisibleEdit(false)}/>
            </Modal>
        </>
    );
};

export default SecretaryTeachersList
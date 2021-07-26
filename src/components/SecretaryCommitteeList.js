import {Button, Col, Row, Typography, Modal} from "antd";
import React, {useState} from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import {PlusOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";
import {useAuth} from "../providers/Auth";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import CommitteeCareerForm from "./CommitteeCareerForm";

const {Title} = Typography;

const SecretaryCommitteeList = () => {
    let location = useLocation();
    const {isAuthenticated} = useAuth();

    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: false,
        openKeys: [],
    });
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);


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
            title: "Carrera",
            dataIndex: "career",
            key: "career",
            width: 150,
            ...SearchColumnFilter("career"),
        },
        {
            title: "Miembro 1",
            dataIndex: "first_member",
            key: "first_member",
            width: 150,
            ...SearchColumnFilter("first_member"),
        },
        {
            title: "Miembro 2",
            dataIndex: "second_member",
            key: "second_member",
            width: 150,
            ...SearchColumnFilter("second_member"),
        },
        {
            title: "Miembro 3",
            dataIndex: "third_member",
            key: "third_member",
            width: 150,
            ...SearchColumnFilter("third_member"),
        },
        {
            title: "Miembro 4",
            dataIndex: "fourth_member",
            key: "fourth_member",
            width: 150,
            ...SearchColumnFilter("fourth_member"),
        },
        {
            title: "Horario comisión",
            dataIndex: "committee_schedule",
            key: "committee_schedule",
            width: 150,
            ...SearchColumnFilter("committee_schedule"),
        },
        {
            title: "Pendientes",
            dataIndex: "pending",
            key: "pending",
            width: 150,
            ...SearchColumnFilter("pending"),
        },
    ];

    const data = [
        {
            key: '1',
            career: 'ASI',
            first_member: 'Edwin Salvador',
            second_member: 'Juan Pablo Zaldumbide',
            third_member: 'Ivonne Maldonado',
            fourth_member: 'Monica Vinueza',
            committee_schedule: 'Lunes de 9 a 10',
            pending: '3 pendientes'
        },
        {
            key: '2',
            career: 'ET',
            first_member: 'Alex Oña',
            second_member: 'Gabreilea Cevallos',
            third_member: 'Fanny Flores',
            fourth_member: 'Monica Vinueza',
            committee_schedule: 'Martes de 9 a 10',
            pending: '2 pendientes'
        }
    ]




    let content = "";
    let titleTable = "";
    let titleModal = "";
    let titleModalEdit = "";

    titleTable = (
        <Title level={3} style={{color: "#034c70", fontSize: 50}}>
            Carreras y comisiones de titulación
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
                        setVisibleEdit(true);
                    },
                };
            }}
        />
    );

    titleModal = (
        <Title level={3} style={{color: "#034c70"}}>
            Agregar carrera
        </Title>
    )

    titleModalEdit = (
        <Title level={3} style={{color: "#034c70"}}>
            Editar carrera
        </Title>
    )

    return (
        <>
            <Row>
                <Col>{titleTable}</Col>
            </Row>
            <Row>
                <Button style={{backgroundColor: "#034c70", color: "white"}} onClick={()=>setVisible(true)}><PlusOutlined/>Agregar
                    Carrera</Button>
            </Row>
            <br>
            </br>
            <Row>
                <div style={{display: "flex", justifyContent: "center"}}><Col>{content}</Col></div>
            </Row>

            <Modal
                title={titleModal}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <CommitteeCareerForm/>
            </Modal>

            <Modal
                title={titleModalEdit}
                visible={visibleEdit}
                onOk={handleEditOk}
                confirmLoading={confirmLoadingEdit}
                onCancel={handleEditCancel}
            >
                <CommitteeCareerForm/>
            </Modal>
        </>
    );
};

export default SecretaryCommitteeList

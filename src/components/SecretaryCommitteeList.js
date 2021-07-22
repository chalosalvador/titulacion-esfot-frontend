import {Button, Col, Layout, Menu, Row, Typography, Modal, Form} from "antd";
import React, {useState} from "react";
import "../styles/teacher-panel.css";
import Table from "antd/es/table";
import {LoadingOutlined, LogoutOutlined, PlusOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../providers/Auth";
import Routes from "../constants/routes";
import "../styles/home-teacher.css";
import SearchColumnFilter from "./SearchColumnFilter";
import AddCommissionForm from "./AddCommissionForm";
import EditCommissionForm from './EditCommissionForm';
import Loading from './Loading';
import {useCommissionsList} from '../data/useCommissionsList';
import { useCareersList } from '../data/useCareersList';

const {Content, Sider} = Layout;
const {Title} = Typography;

const SecretaryCommitteeList = () => {
    let location = useLocation();
    const {isAuthenticated, isCheckingAuth} = useAuth();
    const [form] = Form.useForm();
    const {commissions, isLoading, isError} = useCommissionsList();
    const {careers} = useCareersList();


    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: false,
        openKeys: [],
    });
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [commissionToEdit, setCommissionToEdit] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);

    // Handles modal agregar comision

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
        // console.log('form', form.getFieldsValue());
        setConfirmLoading(true);
        setTimeout(() => {
            form.submit();
            // setVisible(false);
            setConfirmLoading(false);
            // form.resetFields();
        }, 2000);
    };

    const handleCancel = () => {
        form.resetFields();
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
        setVisibleEdit(false);
    };

    React.useEffect(() => {
        setMenuState({
            ...menuState,
            current: location.pathname,
        });
    }, [location, isAuthenticated]);

    if(isLoading){
        return <Loading />;
    }

    if(isError){
        return "Error";
    }

    console.log("commissions", commissions);

    // Columnas y datos para la tabla

    const columns = [
        {
            title: "Carrera",
            dataIndex: "career_id",
            key: "career_id",
            width: 150,
            ...SearchColumnFilter("career_id"),
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
            dataIndex: "commission_schedule",
            key: "commission_schedule",
            width: 150,
            ...SearchColumnFilter("commission_schedule"),
        },
        {
            title: "Pendientes",
            dataIndex: "pending",
            key: "pending",
            width: 150,
            ...SearchColumnFilter("pending"),
        },
    ];

    const data = commissions.map((commission)=>{
        return {
            key: commission.career_id,
            career_id: commission.career_name,
            first_member: commission.members[0] ? commission.members[0].name :  "Por asignar",
            second_member: commission.members[1] ? commission.members[1].name : "Por asignar",
            third_member: commission.members[2] ? commission.members[2].name : "Por asignar",
            fourth_member: commission.members[3] ? commission.members[3].name : "Por asignar",
            commission_schedule: commission.commission_schedule,
            pending: '3 pendientes'
        }
    })

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
                        console.log('record', record);
                        const commissionFormData = {
                            career_id: record.key
                        }
                        setCommissionToEdit(commissionFormData);
                    },
                };
            }}
        />
    );

    titleModal = (
        <Title level={3} style={{color: "#034c70"}}>
            Agregar comisión
        </Title>
    )

    titleModalEdit = (
        <Title level={3} style={{color: "#034c70"}}>
            Editar comisión
        </Title>
    )

    const modalAddCommissionProps = {
        title: titleModal,
        visible: visible,
        onOk(){ handleOk() },
        closable: true,
        confirmLoading: confirmLoading,
        onCancel() { handleCancel() },
        cancelButtonProps: { hidden: true },
        okButtonProps: {
            style: {
                marginRight: '40%',
                backgroundColor: '#034c70'
            },
            icon: <PlusOutlined />,
        },
        okText: 'Agregar'
    }

    const modalEditCommissionProps = {
        title: titleModalEdit,
        visible: visibleEdit,
        onOk(){handleEditOk()},
        confirmLoading: confirmLoadingEdit,
        onCancel(){handleEditCancel()},
        onClose(){form.resetFields()}
    }

    return (
        <>
            <Row>
                <Col>{titleTable}</Col>
            </Row>
            <Row>
                <Button style={{backgroundColor: "#034c70", color: "white"}} onClick={showModal}><PlusOutlined/>Agregar
                    Comisión</Button>
            </Row>
            <br>
            </br>
            <Row>
                <div style={{display: "flex", justifyContent: "center"}}><Col>{content}</Col></div>
            </Row>

            <Modal
              {...modalAddCommissionProps}
            >
                <AddCommissionForm form={form} careers={careers} closeModal={()=>{setVisible(false)}}/>
            </Modal>

            <Modal
              {...modalEditCommissionProps}
            >
                <EditCommissionForm form={form} commission={commissionToEdit} careers={careers} closeModal={()=>{setVisibleEdit(false)}} />
            </Modal>
        </>
    );
};

export default SecretaryCommitteeList

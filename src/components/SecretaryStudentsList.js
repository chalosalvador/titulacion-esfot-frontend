import React, {useEffect, useState} from "react";
import {Button, Col, Menu, Row, Typography, message} from "antd";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../providers/Auth";
import {useStudentsList} from "../data/useStudentsList";
import SearchColumnFilter from "./SearchColumnFilter";
import Routes from "../constants/routes";
import {LoadingOutlined, LogoutOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import Loading from "./Loading";
import ShowError from "./ShowError";
import Table from "antd/es/table";
import API from '../data';
import Tag from "antd/es/tag";


const {Title} = Typography;

const SecretaryStudentsList = () => {
    let location = useLocation();
    const {isAuthenticated, isCheckingAuth, currentUser} = useAuth();
    const {students, isLoading, isError, mutate} = useStudentsList();
    const [file, setFile] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: false,
        openKeys: [],
    });

    const handleClick = (e) => {
        console.log("click ", e);
        setMenuState({
            ...menuState,
            current: e.key,
        });
    };

    const handleChange = (file) => {
        setFile(file[0])
    };

    React.useEffect(() => {
        setMenuState({
            ...menuState,
            current: location.pathname,
        });
    }, [location, isAuthenticated]);

    const submitData = async (e) => {
        e.preventDefault()
        const fData = new FormData()
        fData.append('file', file)
        try{
            await API.post('/students/uploadImportFile', fData)
            message.success('Los datos de los estudiante se han cargado con exito!');
        } catch (e) {
            console.log("Ha ocurrido un error",e);
            message.error('Ha ocurrido un error al subir el archivo');
        }
    }
    //END UPLOAD FILE
    // const deleteStudent = async (record) => {
    //     setIsSubmitting(true)
    //     await deleteObject('students', record.student_id)
    //     setIsSubmitting(false)
    //     setShowModal(false)
    // }

    const columns = [
        {
            title: "Estudiante",
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
        },
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

    const getStudentsData = students.map((student, index) => {
        return {
            key: index,
            id: student.id,
            originalData: student,
            name: student.user.name,
            career: student.career,
            email: student.user.email
        }
    });

    console.log("Estudiantes", getStudentsData);

    const onSearch = (value) => console.log(value);
    let content = "";
    let titleTable = "";
    let studentsFile = "";

    studentsFile = (
        <form onSubmit={submitData}>
            <input
                key="file"
                name="file"
                type="file"
                onChange={(e) => handleChange(e.target.files)}
            />
            <button key="submit" type="submit" onClick={submitData} style={{backgroundColor: "#034c70", color: "white"}}>
                <UploadOutlined/> Subir listado
            </button>
        </form>
    )

    titleTable = (
        <Title level={3} style={{color: "#034c70", fontSize: 50}}>
            Listado de estudiantes
        </Title>
    );

    content = (
        <Table
            dataSource={getStudentsData}
            columns={columns}
            rowKey={(data) => data.id}
            style={{overflowX: "auto"}}
        />
    );

    return (
        <>
            <Row>
                <Col>{titleTable}</Col>
            </Row>

            <Row>
                <Col>{studentsFile}</Col>
            </Row>

            <br/>
            <br/>

            <Row>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Col>{content}</Col>
                </div>
            </Row>

        </>
    )
}

export default SecretaryStudentsList;
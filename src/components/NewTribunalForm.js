import React, {useEffect, useState} from "react";
import {Form, Input, message, Button, Select, Col, Row, Alert, Icon, Switch, Table} from "antd";
import {useCareersList} from "../data/useCareersList";
import Loading from "./Loading";
import ShowError from "./ShowError";
import {Option} from "antd/es/mentions";
import API from "../data";

const {Item} = Form;

const NewTribunalForm = ({project, projectid, closeModal}) => {
    const [loading, setLoading] = useState(false);
    const {careers, isLoading, isError} = useCareersList();

    console.log("props project", project);

    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }

    const formSuccess = async (datos) => {
        console.log("Datos recibidos del form", datos);
        const {career_id} = datos;
        setLoading(true);
        const jury = {
            // member1: member1,
            // member2: member2,
            // member3: member3,
            career_id: career_id,
            project_id: project.id,
            tribunalSchedule: "Prueba"
        };
        console.log("Arreglo", jury);
        try {
            await API.post("/juries/", jury);
            console.log("Tribunal creado exitosamente", jury);
            message.success("Cambios guardados correctamente!");
            setLoading(false);
            // mutate();
            closeModal();
        } catch (e) {
            message.error(e);
        }
    }

    const formFailed = (error) => {
        console.log("Error: ", error);
    }

    return (
        <div>
            <div>
                <Form
                    onFinish={formSuccess}
                    onFinishFailed={formFailed}>
                    <Item label="Titulo"
                          name="title"
                          disabled={true}
                          rules={[{
                              required: true,
                              message: "Por favor ingrese el título del proyecto",
                          }]}
                          initialValue={project.title}>
                        <Input/>
                    </Item>
                    <Item label="Carrera"
                          name="career_id"
                          disabled={true}
                          rules={[{
                              required: true,
                              message: "Por favor ingresa el id de la carrera",
                              disabled: true
                          }
                          ]}
                          initialValue={project.teacher_career}>
                        <Select
                            placeholder="Seleccione"
                            style={{width: 300}}
                            loading={isLoading}
                        >
                            {careers &&
                            careers.map((career, index) => (
                                <Option value={career.id} key={index}>
                                    {career.name}
                                </Option>
                            ))}
                        </Select>
                    </Item>
                    <Row type='flex' justify='center'>
                        <Col>
                            <Item>
                                <Button type="primary" htmlType="submit" size='large'>Guardar</Button>
                            </Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default NewTribunalForm;
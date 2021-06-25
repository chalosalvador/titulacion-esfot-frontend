import React, {useState} from "react";
import {Form, Input, message, Button, Select, Col, Row, Alert} from "antd";
import {useTeachers} from "../data/useTeachers";
import {useCareersList} from "../data/useCareersList";
import Loading from "./Loading";
import ShowError from "./ShowError";
import API from "../data";
import {Option} from "antd/es/mentions";

const {Item} = Form;

const SecretaryAddTeacherForm = ({closeModal}) => {

    const [loading, setLoading] = useState(false);
    const {careers, isLoading, isError} = useCareersList();
    const {mutate} = useTeachers();

    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }

    // Funcion de guardado de nuevo profesor
    const formSuccess = async (datos) => {
        setLoading(true);
        try {
            await API.post("/teachers/",datos);
            console.log("Profesor creado exitosamente: ", datos);
            message.success("Cambios guardados correctamente!");
            setLoading(false);
            mutate();
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
                <Form name="new_teacher"
                onFinish={formSuccess}
                onFinishFailed={formFailed}>
                    <Item label="Nombre"
                    name="name"
                    rules={[{
                        required: true,
                        message:"Por favor ingrese el nombre del profesor"
                    }
                    ]}>
                        <Input />
                    </Item>
                    <Item label="Carrera"
                          name="career_id"
                          rules={[{
                              required: true,
                              message:"Por favor ingresa el id de la carrera"
                          }
                          ]}>
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
                    <Item label="Correo electrónico"
                          name="email"
                          rules={[{
                              required: true,
                              message:"Por favor ingrese el email del profesor"
                          }
                          ]}>
                        <Input />
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

};

export default SecretaryAddTeacherForm;
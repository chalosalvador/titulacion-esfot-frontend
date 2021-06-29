import React, {useState} from "react";
import {Form, Input, message, Button, Select, Col, Row, Alert} from "antd";
import {useTeachers} from "../data/useTeachers";
import {useCareersList} from "../data/useCareersList";
import Loading from "./Loading";
import ShowError from "./ShowError";
import API from "../data";

const {Item} = Form;

const SecretaryUpdateTeacherForm = ({teacher, teacherId, closeModal}) => {
    const [loading, setLoading] = useState(false);
    const {careers, isLoading, isError} = useCareersList();
    const {mutate} = useTeachers();
    console.log("Props", teacher);

    //Carga de datos de carreras
    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }

    // Funcion de guardado de nuevo profesor
    const formSuccess = async (datos) => {
        console.log("Lo que se queria enviar 1", datos);
        setLoading(true);
        try {
            await API.put(`/teachers/${teacherId}`, datos);
            console.log("Profesor creado exitosamente: ", datos);
            message.success("Cambios guardados correctamente!");
            setLoading(false);
            mutate();
            closeModal();
        } catch (e) {
            message.error(e);
        }
    }

    const formFailed = (error,datos) => {
        console.log("Lo que se queria enviar 2", datos);
        console.log("Error: ", error);
    }

    console.log("Id de la carrera", teacher.career_id);

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
                              message: "Por favor ingrese el nombre del profesor"
                          }
                          ]}
                          initialValue={teacher.name}
                    >
                        <Input/>
                    </Item>
                    <Item label="Carrera"
                          name="career_id"
                          rules={[{
                              required: false,
                              message: "Por favor ingresa el id de la carrera"
                          }
                          ]}
                    >
                        <Select
                            // placeholder="Seleccione"
                            style={{width: 300}}
                            loading={isLoading}
                            defaultValue={teacher.career_id}
                        >
                            {careers &&
                            careers.map((career, index) => (
                                <Select.Option value={career.id} key={index}>
                                    {career.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Item>
                    <Item label="Correo electrónico"
                          name="email"
                          rules={[{
                              required: true,
                              message: "Por favor ingrese el email del profesor"
                          }
                          ]}
                          initialValue={teacher.email}
                    >
                        <Input/>
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

export default SecretaryUpdateTeacherForm;

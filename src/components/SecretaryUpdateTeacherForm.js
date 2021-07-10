import React, {useState} from "react";
import {Form, Input, message, Button, Select, Col, Row, Alert, Switch, Table} from "antd";
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
    const [hoursSelected, setHoursSelected] = useState(0);
    const [scheduleEdited, setScheduleEdited] = useState(false);
    console.log("Props", teacher);


    const scheduleData = JSON.parse(teacher.schedule);
    console.log("Horario de regreso", scheduleData);

    //Carga de datos de carreras
    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }


    const handleScheduleChange = checked => {
        setScheduleEdited(true);
        if (checked) {
            setHoursSelected(hoursSelected + 1);
        } else {
            setHoursSelected(hoursSelected - 1);
        }
    };

    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday'
    ];

    const columns = [
        {
            title: 'Hora',
            dataIndex: 'hour',
            key: 'hour',
            width: 150
        },
        {
            title: 'Lunes',
            dataIndex: 'monday',
            key: 'monday',
            width: 200
        },
        {
            title: 'Martes',
            dataIndex: 'tuesday',
            key: 'tuesday',
            width: 200
        },
        {
            title: 'Miércoles',
            dataIndex: 'wednesday',
            key: 'wednesday',
            width: 200
        },
        {
            title: 'Jueves',
            dataIndex: 'thursday',
            key: 'thursday',
            width: 200
        },
        {
            title: 'Viernes',
            dataIndex: 'friday',
            key: 'friday',
            width: 200
        }
    ];


    const data = [];
    for (let i = 7; i < 20; i++) {
        let daysByHour = {};
        days.forEach((day) => {
            daysByHour[day] = (
                <Item name={[day, i]} initialValue={scheduleData[day][i]}><Switch checked={scheduleData[day][i]}
                                                                                  valuepropname='checked'
                                                                                  className={'schedule-form__switch'}
                                                                                  onChange={handleScheduleChange}/></Item>)
        })

        data.push({
            key: i,
            hour: `${i}h00 - ${i + 1}h00`,
            ...daysByHour
        });
    }
    console.log('data', data);

    // Funcion de guardado de nuevo profesor
    const formSuccess = async (datos) => {
        console.log("Lo que se queria enviar 1", datos);
        const {name, email, career_id, monday, tuesday, wednesday, thursday, friday} = datos;
        const schedule = {
            monday: {...monday},
            tuesday: {...tuesday},
            wednesday: {...wednesday},
            thursday: {...thursday},
            friday: {...friday}
        };
        const uniqueSchedule = Object.assign(scheduleData, schedule);
        console.log("Dias antes de enviar", uniqueSchedule);
        const textSchedule = JSON.stringify(uniqueSchedule);
        setLoading(true);
        const teacher = {
            name: name,
            career_id: career_id,
            email: email,
            schedule: textSchedule
        };
        try {
            await API.put(`/teachers/${teacherId}`, teacher);
            console.log("Profesor creado exitosamente: ", teacher);
            message.success("Cambios guardados correctamente!");
            setLoading(false);
            mutate();
            closeModal();
        } catch (e) {
            message.error(e);
        }
    }

    const formFailed = (error, datos) => {
        console.log("Lo que se queria enviar 2", datos);
        console.log("Error: ", error);
    }

    console.log("Id de la carrera", teacher.career_id);


    return (
        <div>
            <div>
                <Form
                    className='schedule-form'
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
                          initialValue={teacher.career_id}
                    >
                        <Select
                            style={{width: 300}}
                            loading={isLoading}
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
                        <Col span={40}>
                            <Table pagination={false}
                                   columns={columns}
                                   className={'schedule-form__table'}
                                   dataSource={data}
                                   size={'large'}
                                   bordered
                                   title={() => hoursSelected < 1
                                       ? <Alert message='Selecciona las horas en las que el profesor está disponible'
                                                banner type='error'/>
                                       : <Alert message='Asegúrate de que el horario esté ingresado correctamente'
                                                banner
                                                type='info'/>}
                            />
                        </Col>
                    </Row>
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

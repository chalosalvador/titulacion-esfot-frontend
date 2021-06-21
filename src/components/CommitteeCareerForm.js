import React from "react";
import { Form, Input } from "antd";

const formItemLayout = {
    labelCol: {
        xs: { span: 18 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const CommitteeCareerForm = ({ form }) => {
    // const [ currentSpecifics, setCurrentSpecifics ] = useState( [] );

    // const handleChangeWideField = ( value ) => {
    //   form.setFieldsValue( { specific_field: null } );
    //   setCurrentSpecifics( specificFields[ wideFields.indexOf( value ) ] );
    // };

    return (
        <Form
            {...formItemLayout}
            name="committee"
            // onFinish={ onSubmit }
            form={form}
            // initialValues={ props.internship }
        >
            <Form.Item
                name="career_name"
                label="Nombre de la carrera:"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Escoje el nombre de la carrera",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder="Carrera"
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
            <Form.Item
                name="committee_schedule"
                label="Horario de la comisión:"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Coloca un horario para la reunión de la comisión",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder="Horario"
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
            <Form.Item
                name="first_member"
                label="Primer miembro: "
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Selecciona un integrante para la comisión",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder=""
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
            <Form.Item
                name="second_member"
                label="Segundo miembro: "
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Selecciona un integrante para la comisión",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder=""
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
            <Form.Item
                name="third_member"
                label="Tercer miembro: "
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Selecciona un integrante para la comisión",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder=""
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
            <Form.Item
                name="fourth_member"
                label="Cuarto miembro: "
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Selecciona un integrante para la comisión",
                    },
                ]}
            >
                <Input.TextArea
                    placeholder=""
                    autoSize={{ maxRows: 4 }}
                />
            </Form.Item>
            {/*<Form.Item justify='center'>*/}
            {/*  <Button type={ 'primary' } htmlType={ 'submit' }>*/}
            {/*    Agregar Tema*/}
            {/*  </Button>*/}
            {/*</Form.Item>*/}
        </Form>
    );
};

export default CommitteeCareerForm;
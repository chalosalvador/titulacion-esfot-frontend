import React, { useState, useEffect } from 'react';
import { Form, Input, message, Select } from 'antd';
import {useTeachers} from '../data/useTeachers';
import {useCareer} from '../data/useCareer';
import Loading from './Loading';

const formItemLayout = {
  labelCol: {
    md: { span: 12 }
  },
  wrapperCol: {
    md: { span: 24 }
  }
}

const EditCommissionForm = ({form, commission,careers, closeModal}) => {

  const [teachersList,setTeachersList] = useState([]);
  const {career, isLoading, isError} = useCareer(commission.career_id);
  const {teachers} = useTeachers();

  const onChange = ( value ) => {
    const teachersCareer = teachers.filter((teacher)=>teacher.career_id===value);
    const teacherCareerList = teachersCareer.map((teacher)=>{
      return {
        id: teacher.id,
        value: teacher.id,
        label: teacher.name,
      }
    });
    setTeachersList(teacherCareerList);
  };

  const careersList = careers.map((career)=>{
    return {
      label: career.name,
      value: career.id
    }
  });

  const onSubmit = (values) =>{
    console.log('values', values);
  }

  useEffect(()=>{
    if(career){
      setTeachersList(career.teachers.data.map((teacher)=>{
        return {
          id: teacher.id,
          value: teacher.id,
          label: teacher.name
        }
      }));
    }
  }, [career]);

  if(isLoading){
    return <Loading />;
  }

  if(isError){
    return "Error";
  }

  console.log('career', career);



  return (
    <Form
      { ...formItemLayout }
      name='committee'
      onFinish={ onSubmit }
      form={ form }
      layout={'vertical'}
      initialValues={{
        'career_id': career.name,
        'commission_schedule': career.commission.commission_schedule,
        'members': career.commission.members.map((member)=>member.name)
      }}
    >
      <Form.Item
        name='career_id'
        label='Carrera:'
        rules={ [
          {
            required: true,
            message: 'Escoje el nombre de la carrera',
          },
        ] }
      >
        <Select
          showSearch
          style={ { width: '100%' } }
          placeholder='Selecciona una carrera'
          optionFilterProp='children'
          onChange={ onChange }
          filterOption={ ( input, option ) =>
            option.children.toLowerCase().indexOf( input.toLowerCase() ) >= 0
          }
          options={careersList}
        />
      </Form.Item>
      <Form.Item
        name='commission_schedule'
        label='Horario de la comisión:'
        rules={ [
          {
            required: true,
            whitespace: true,
            message: 'Coloca un horario para la reunión de la comisión',
          },
        ] }
      >
        <Input.TextArea
          placeholder='Horario'
          autoSize={ { maxRows: 4 } }
        />
      </Form.Item>
      <Form.Item
        name='members'
        label='Miembros de la comisión'
        rules={ [
          {
            required: true,
            message: 'Debe haber al menos dos miembros'
          }
        ] }>
        <Select
          mode='multiple'
          placeholder='Selcciona los profesores'
          showArrow
          // defaultValue={ [ 'a10', 'c12' ] }
          // onChange={ handleChange }
          style={ { width: '100%' } }
          options={teachersList}
        />
      </Form.Item>
    </Form>
  );
}

export default EditCommissionForm;

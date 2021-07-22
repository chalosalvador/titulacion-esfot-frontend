import React, {useState} from 'react';
import { Form, Input, message, Select } from 'antd';
import { useTeachers } from '../data/useTeachers';
import { useCommissionsList } from '../data/useCommissionsList';
import Loading from './Loading';
import API from '../data';

const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
    md: { span: 12 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 24 }
  },
};

const AddCommissionForm = ( { form, careers, closeModal } ) => {

  const [teachersList,setTeachersList] = useState([]);
  const { teachers, isLoading, isError } = useTeachers();
  const {mutate} = useCommissionsList();


  const handleChange = ( value ) => {
    const teachersSelected = [];
    for(let i = 0; i<value.length;i++){
      teachersList.forEach((teacher)=>{
        if(teacher.value===value[i]){
          teachersSelected.push(teacher.id);
        }
      });
    }
  };

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

  const onSubmit = async (values) => {

    try {
      await API.post('/commissions/commissions', values);
      message.success('Comisión creada con éxito');
      await mutate();
      closeModal();
    } catch( e ){
      message.error('Ocurrió un error');
      console.log("error", e);
    }
  }


  if( isLoading  ) {
    return <Loading />;
  }

  if( isError  ) {
    return 'error';
  }


  const careersList = careers.map((career)=>{
    return {
      label: career.name,
      value: career.id
    }
  });

  return (
    <Form
      { ...formItemLayout }
      name='committee'
      onFinish={ onSubmit }
      form={ form }
      layout={'vertical'}
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
          onChange={ handleChange }
          style={ { width: '100%' } }
          options={teachersList}
        />
      </Form.Item>
    </Form>
  );
};

export default AddCommissionForm;

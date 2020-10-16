import React, { useEffect, useState } from 'react';
import withAuth from '../hocs/withAuth';
import { Button, Col, Form, Input, Row, Comment, List, message } from 'antd';
import moment from 'moment';
import API from '../data';

const { TextArea } = Input;


const AddComments = ( props ) => {

  const [ sending, setSending ] = useState( false );
  const [ comments, setComments ] = useState( [] );
  useEffect( () => {
    let comment = [];
    switch( props.comments ) {
      case 'title_comment':
        comment = [
          {
            content: <p>{ props.plan.title_comment }</p>,
            datetime: props.plan.title_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'problem_comment':
        comment = [
          {
            content: <p>{ props.plan.problem_comment }</p>,
            datetime: props.plan.problem_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'justification_comment':
        comment = [
          {
            content: <p>{ props.plan.justification_comment }</p>,
            datetime: props.plan.justification_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'hypothesis_comment':
        comment = [
          {
            content: <p>{ props.plan.hypothesis_comment }</p>,
            datetime: props.plan.hypothesis_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'general_objective_comment':
        comment = [
          {
            content: <p>{ props.plan.general_objective_comment }</p>,
            datetime: props.plan.general_objective_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'specifics_objectives_comment':
        comment = [
          {
            content: <p>{ props.plan.specifics_objectives_comment }</p>,
            datetime: props.plan.specifics_objectives_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'methodology_comment':
        comment = [
          {
            content: <p>{ props.plan.methodology_comment }</p>,
            datetime: props.plan.methodology_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'work_plan_comment':
        comment = [
          {
            content: <p>{ props.plan.work_plan_comment }</p>,
            datetime: props.plan.work_plan_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'schedule_comment':
        comment = [
          {
            content: <p>{ props.plan.schedule_comment }</p>,
            datetime: props.plan.schedule_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      case 'bibliography_comment':
        comment = [
          {
            content: <p>{ props.plan.bibliography_comment }</p>,
            datetime: props.plan.bibliography_comment
              ? moment().fromNow()
              : '',
          }
        ];
        break;
      default:
        console.log( 'No existe el campo' );
        comment = [];
        break;
    }
    console.log( comment );
    setComments( () => comment );
    return () => {
      setComments( [] );
      console.log( 'se va xd' );
    };

  }, [ props.comments ] );


  console.log( 'Comentarios para', props.comments );

  const CommentList = ( { comments } ) => (
    <List
      dataSource={ comments }
      itemLayout='horizontal'
      renderItem={ props => <Comment { ...props } /> }
    />
  );

  const Editor = ( { onChange, onSubmit } ) => (
    <>
      <Form onFinish={ onSubmit }>
        <Form.Item name={ props.comments }>
          <TextArea placeholder={ 'Ingresa tu comentario' }
                    rows={ 2 }
                    style={ { width: 500 } }
                    onChange={ onChange } />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'
                  loading={ sending }
                  style={ {
                    backgroundColor: '#034c70',
                    color: '#ffffff'
                  } }>
            Agregar Comentario
          </Button>
        </Form.Item>
      </Form>

    </>
  );


  const onFinish = async( values ) => {

    setSending( true );
    console.log( 'values', values );
    const data = { ...values };

    console.log( 'DATOS', data );

    try {
      await API.post( `/projects/${ props.planID }`, data );
      setSending( false );
      message.success( 'Comentario agregado con éxito!' );
      switch( props.comments ) {
        case 'title_comment':
          setComments( [
            {
              content: <p>{ values.title_comment }</p>,
              datetime: values.title_comment
                ? moment().fromNow()
                : '',
            }
          ] );
          break;
        case 'problem_comment':
          setComments( [
            {
              content: <p>{ values.problem_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'justification_comment':
          setComments( [
            {
              content: <p>{ values.justification_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'hypothesis_comment':
          setComments( [
            {
              content: <p>{ values.hypothesis_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'general_objective_comment':
          setComments( [
            {
              content: <p>{ values.general_objective_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'specifics_objectives_comment':
          setComments( [
            {
              content: <p>{ values.specifics_objectives_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'methodology_comment':
          setComments( [
            {
              content: <p>{ values.methodology_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'work_plan_comment':
          setComments( [
            {
              content: <p>{ values.work_plan_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'schedule_comment':
          setComments( [
            {
              content: <p>{ values.schedule_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;
        case 'bibliography_comment':
          setComments( [
            {
              content: <p>{ values.bibliography_comment }</p>,
              datetime: moment().fromNow(),
            }
          ] );
          break;

        default:
          console.log( 'No existe el campo' );
          break;
      }
    } catch( e ) {
      console.log( 'ERROR', e );
      message.error( `No se guardaron los datos:¨${ e }` );
    }
  };

  const handleChange = e => {
    console.log( 'value', e.target.value );
  };


  return (
    <>
      <Row>
        <Col>
          { comments.length > 0 && <CommentList comments={ comments } /> }
          <Comment
            content={
              <Editor
                onChange={ handleChange }
                onSubmit={ onFinish }
                // submitting={ submitting }
                // value={ value }
              />
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default withAuth( AddComments );
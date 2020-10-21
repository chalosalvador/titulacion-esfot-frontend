import React, { useEffect, useState } from 'react';
import withAuth from '../hocs/withAuth';
import { Button, Col, Form, Input, Row, Comment, List, message } from 'antd';
import API from '../data';

const { TextArea } = Input;


const ViewComments = ( props ) => {

    const [ sending, setSending ] = useState( false );
    const [ comments, setComments ] = useState( [] );
    useEffect( () => {
      let comment = '';
      switch( props.comments ) {
        case 'title_comment':
          comment = props.plan[ 0 ].title_comment;
          break;
        case 'problem_comment':
          comment = props.plan[ 0 ].problem_comment;
          break;
        case 'justification_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].justification_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].justification_comment }</p>
                  : ''
              }</div>
            }
          ];
          break;
        case 'hypothesis_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].hypothesis_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].hypothesis_comment }</p>
                  : ''
              }</div>
            }
          ];
          break;
        case 'general_objective_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].general_objective_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].general_objective_comment }</p>
                  : ''
              }</div>
            }
          ];
          break;
        case 'specifics_objectives_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].specifics_objectives_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].specifics_objectives_comment }</p>
                  : ''
              }</div>
            }
          ];
          break;
        case 'methodology_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].methodology_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].methodology_comment }</p>
                  : ''
              }</div>
            }
          ];
          break;
        case 'work_plan_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].work_pkan_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].work_plan_comment }</p>
                  : ''
              }</div>
            }
          ];
          break;
        case 'schedule_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].schedule_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].schedule_comment }</p>
                  : ''
              }</div>
            }
          ];
          break;
        case 'bibliography_comment':
          comment = [
            {
              content: <div>{
                props.plan[ 0 ].bibliography_comment
                  ? <p><b>Comentarios: </b>{ props.plan[ 0 ].bibliography_comment }</p>
                  : ''
              }</div>
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
    console.log( 'Comentarios para', props.plan[ 0 ] );

    const Editor = ( { onSubmit, comments } ) => (
      <>
        <Form onFinish={ onSubmit }
              initialValues={ props.plan[ 0 ] }>
          <Form.Item name={ props.comments }>
            <TextArea rows={ 2 }
                      style={ { width: 500 } }
                      disabled />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'
                    loading={ sending }
                    style={ {
                      backgroundColor: '#034c70',
                      color: '#ffffff'
                    } }>
              Marcar como corregido
            </Button>
          </Form.Item>
        </Form>
      </>
    );


    const onFinish = async( values ) => {

      setSending( true );
      console.log( 'values', Object.values( values ) );

      const value = {};
      value[ props.comments ] = null;

      console.log( 'key', value );

      try {
        await API.post( `/projects/${ props.planID }`, value );
        setSending( false );
        message.success( 'Comentario corregido!' );

      } catch( e ) {
        console.log( 'ERROR', e );
        message.error( `No se guardaron los datos:¨${ e }` );
      }
    };


    return (
      <>
        <Row>
          <Col>
            <Comment
              content={
                <Editor
                  onSubmit={ onFinish }
                  comments={ comments }
                />
              }
            />
          </Col>
        </Row>
      </>
    );
  }
;

export default withAuth( ViewComments );
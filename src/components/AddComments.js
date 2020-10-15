import React, { useState } from 'react';
import withAuth from '../hocs/withAuth';
import { Button, Col, Form, Input, Row, Comment, List, message } from 'antd';
import API from '../data';

const { TextArea } = Input;

const CommentList = ( { comments } ) => (
  <List
    dataSource={ comments }
    header={ `${ comments.length } ${ comments.length > 1
      ? 'replies'
      : 'reply' }` }
    itemLayout='horizontal'
    renderItem={ props => <Comment { ...props } /> }
  />
);

const AddComments = ( props ) => {

  const [ sending, setSending ] = useState( false );

  console.log( 'Comentarios para', props.comments );

  const Editor = ( { onChange, onSubmit, submitting, value } ) => (
    <>
      <Form>
        <Form.Item>
          <TextArea name='comments' placeholder={ 'Ingresa tu comentario' }
                    rows={ 2 }
                    style={ { width: 500 } }
                    onChange={ onChange }
                    value={ value } />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'
                  loading={ sending }
                  onClick={ onFinish }
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

    const data = new FormData();
    data.append( `${ props.comments }`, values.comments );
    console.log( 'COMENTARIOS', values.comments );

    try {
      setSending( false );
    } catch( e ) {
      console.log( 'ERROR', e );
      message.error( `No se guardaron los datos:¨${ e }` );
    }
  };

  const handleChange = e => {
    console.log( 'value' );
  };


  return (
    <>
      <Row>
        <Col>
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
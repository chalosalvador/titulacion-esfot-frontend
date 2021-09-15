import React, { useEffect, useState } from "react";
import withAuth from "../hocs/withAuth";
import { Button, Col, Comment, Form, Input, List, message, Row } from "antd";
import API from "../data";

const { TextArea } = Input;

const AddComments = (props) => {
  const [sending, setSending] = useState(false);
  const [solving, setSolving] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let comment = [
      {
        content: (
          <div>
            {props.plan[props.comments] ? (
              <p>
                <b>Comentario: </b>
                {props.plan[props.comments]}
              </p>
            ) : (
              "No has realizado ningún comentario aún."
            )}
          </div>
        ),
      },
    ];

    console.log(comment);
    setComments(comment);
  }, [props.comments, props.plan]);

  const CommentList = ({ comments }) => (
    <>
      <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
      />
      <Button loading={solving} danger onClick={solveComment(props.comments)}>
        Solventar comentario
      </Button>
    </>
  );

  const Editor = ({ onChange, onSubmit }) => (
    <>
      <Form onFinish={onSubmit}>
        <Form.Item name={props.comments}>
          <TextArea
            placeholder={
              !props.plan[props.comments]
                ? "Ingresa tu comentario"
                : "Editar tu comentario"
            }
            rows={2}
            style={{ width: 500 }}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={sending}
            style={{
              backgroundColor: "#034c70",
              color: "#ffffff",
            }}
          >
            Guardar Comentario
          </Button>

          <Button type="link" onClick={props.onClose}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </>
  );

  const onFinish = async (values) => {
    setSending(true);
    console.log("values", values);
    const data = { ...values };

    console.log("DATOS", data);

    try {
      await API.post(`/projects/${props.planID}`, data);
      setSending(false);
      message.success("Comentario agregado con éxito!");
      let comment = [
        {
          content: (
            <div>
              {values[props.comments] ? (
                <p>
                  <b>Comentario: </b>
                  {values[props.comments]}
                </p>
              ) : (
                "No has realizado ningún comentario aún."
              )}
            </div>
          ),
        },
      ];

      console.log(comment);
      setComments(comment);
    } catch (e) {
      console.log("ERROR", e);
      message.error(`No se guardaron los datos:¨${e}`);
    }
  };

  const handleChange = (e) => {
    console.log("value", e.target.value);
  };

  const solveComment = async ({ comments }) => {
    setSolving(true);
    const data = {};
    data[comments] = "";

    console.log("DATOS", data);

    try {
      await API.post(`/projects/${props.planID}`, data);
      setSolving(false);
      message.success("Comentario solventado con éxito!");
    } catch (e) {
      console.log("ERROR", e);
      setSolving(false);
      message.error(`No se guardaron los datos:¨${e}`);
    }
  };

  return (
    <>
      <Row>
        <Col>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            content={<Editor onChange={handleChange} onSubmit={onFinish} />}
          />
        </Col>
      </Row>
    </>
  );
};

export default withAuth(AddComments);

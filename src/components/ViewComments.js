import React, { useEffect, useState } from "react";
import withAuth from "../hocs/withAuth";
import { Col, Comment, List, Row } from "antd";

const ViewComments = (props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let comment = [];
    switch (props.comments) {
      case "title_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].title_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].title_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "problem_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].problem_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].problem_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "justification_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].justification_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].justification_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "hypothesis_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].hypothesis_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].hypothesis_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "general_objective_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].general_objective_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].general_objective_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "specifics_objectives_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].specifics_objectives_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].specifics_objectives_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "methodology_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].methodology_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].methodology_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "work_plan_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].work_pkan_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].work_plan_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "schedule_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].schedule_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].schedule_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      case "bibliography_comment":
        comment = [
          {
            content: (
              <div>
                {props.plan[0].bibliography_comment ? (
                  <p>
                    <b>Comentarios: </b>
                    {props.plan[0].bibliography_comment}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ),
          },
        ];
        break;
      default:
        console.log("No existe el campo");
        comment = [];
        break;
    }
    console.log(comment);
    setComments(() => comment);
    return () => {
      setComments([]);
      console.log("se va xd");
    };
  }, [props.comments]);

  console.log("Comentarios para", props.comments);

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );

  return (
    <>
      <Row>
        <Col>{comments.length > 0 && <CommentList comments={comments} />}</Col>
      </Row>
    </>
  );
};

export default withAuth(ViewComments);

import React from "react";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import "../styles/home-teacher.css";
import { useAuth } from "../providers/Auth";
import withAuth from "../hocs/withAuth";

const { Title } = Typography;

const PrincipalHomePage = () => {
  const { currentUser } = useAuth();

  return <></>;
};

export default withAuth(PrincipalHomePage);

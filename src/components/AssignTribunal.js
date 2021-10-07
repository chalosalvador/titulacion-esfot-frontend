import {
  Button,
  Col,
  Layout,
  Menu,
  Row,
  Typography,
  Modal,
  Input,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import "../styles/teacher-panel.css";

const AssignTribunalModal = () => {
  return (
    <>
      <Modal
        title="Asignar Tribunal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="Título del proyecto" />
        <Input placeholder="Carrera" />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        ,
      </Modal>
    </>
  );
};

export default AssignTribunalModal;

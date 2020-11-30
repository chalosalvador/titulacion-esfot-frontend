import React from 'react';
import { Collapse, Row, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import '../styles/plan-collapse.css'
import PlanFormCommittee from './PlanReviewCommittee';

const { Panel } = Collapse;

const PlanReviewCommittee = ( props ) => {


  return (
    <>
      <Row>
        <Col span={24} className='planCollapse'>
          <Collapse
            bordered={ false }
            defaultActiveKey={ [ '1' ] }
            expandIcon={ ( { isActive } ) => <CaretRightOutlined rotate={ isActive
              ? 90
              : 0 } /> }
            className='site-collapse-custom-collapse'
          >
            <Panel header='Plan de titulación' key='1' className='site-collapse-custom-panel'>
              <PlanFormCommittee idPlan={ props.planId } />
            </Panel>
            <Panel header='Proyecto de titulación' key='2' className='site-collapse-custom-panel'>
              <p>Aqui va el proyecto</p>
            </Panel>
          </Collapse>
        </Col>
      </Row>

    </>
  );
};

export default PlanReviewCommittee;

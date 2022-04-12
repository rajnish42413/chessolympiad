import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button } from 'antd';
import AppLayout from '@layout/app';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from '@components/loader/Loader';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';

function PersonalDetail() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    const data = {
      ...values
    };
    handleSubmitForm(data);
  };

  const handleSubmitForm = async (values: JSON) => {
    console.log(values);
    return;
  };

  return (
    <Card title="CONTACT DETAIL" style={{ marginTop: 20 }}>
      <Form layout="vertical" name="form_in_modal" onFinish={onFinish}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: 'Please input first name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true, message: 'Please input last name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="fide_id"
              label="FIDE ID"
              rules={[{ required: true, message: 'Please input FIDE ID!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: 'Please input country name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="mobile"
              label="mobile"
              rules={[{ required: true, message: 'Please input mobile number!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="email"
              label="email"
              rules={[{ required: true, message: 'Please input email!' }]}
            >
              <Input type="email" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary">Save</Button>
      </Form>
    </Card>
  );
}
// First Name, Last Name, FIDE ID,  Country, Photo, Mobile Number, Email, Remove Visa Upload

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data
  };
};

export default PersonalDetail;

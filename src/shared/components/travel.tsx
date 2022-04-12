import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message, TimePicker, Radio, Card, Row, Col } from 'antd';
import AppLayout from '@layout/app';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from '@components/loader/Loader';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';

function TravelDetail() {
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
    <Card style={{ marginTop: 20 }} title="TRAVEL">
      <Form layout="vertical" name="form_in_modal" onFinish={onFinish}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Form.Item
              name="airport"
              label="Airport Name"
              rules={[{ required: true, message: 'Please input Airport name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Form.Item
              name="flight"
              label="Flight No."
              rules={[{ required: true, message: 'Please input flight!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Form.Item name="time" label="Time">
              <TimePicker />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Form.Item
              name="chennai_at"
              label="Date of Arrival at Chennai"
              rules={[{ required: true, message: 'Please input Date of Arrival at Chennai!' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Form.Item
              name="departure_at"
              label="Date of Departure"
              rules={[{ required: true, message: 'Please input Departure date!' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Form.Item
              name="departure_flight"
              label="Departure Flight No."
              rules={[{ required: true, message: 'Please input Departure flight!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item>
              <Radio.Group>
                <Radio value={1}>Single Room </Radio>
                <Radio value={2}>Double Room </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary">Save</Button>
      </Form>
    </Card>
  );
}

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data
  };
};

export default TravelDetail;

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info: any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

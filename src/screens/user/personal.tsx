import React, { useState } from 'react';
import { Divider, Descriptions, PageHeader, Form, Input, Radio, Button } from 'antd';
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
    <AppLayout>
      <PageHeader
        style={{ padding: 0 }}
        ghost={false}
        onBack={() => window.history.back()}
        title="Personal Detail"
        subTitle="Chess Olympiad Registration"
      />
      <Divider />
      <Form layout="vertical" name="form_in_modal" onFinish={onFinish}>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Please input last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fide_id"
          label="FIDE ID"
          rules={[{ required: true, message: 'Please input FIDE ID!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please input country name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="mobile"
          rules={[{ required: true, message: 'Please input mobile number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="email"
          rules={[{ required: true, message: 'Please input email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Button type="primary">Submit</Button>
      </Form>
    </AppLayout>
  );
}
// First Name, Last Name, FIDE ID,  Country, Photo, Mobile Number, Email, Remove Visa Upload

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data
  };
};

export default PersonalDetail;

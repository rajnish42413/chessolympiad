import React, { useState } from 'react';
import {
  Divider,
  PageHeader,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  message,
  TimePicker,
  Radio
} from 'antd';
import AppLayout from '@layout/app';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from '@components/loader/Loader';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import { UploadOutlined } from '@ant-design/icons';

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
    <AppLayout>
      <PageHeader
        style={{ padding: 0 }}
        ghost={false}
        onBack={() => window.history.back()}
        title="Passport Detail"
        subTitle="Chess Olympiad Registration"
      />
      <Divider />
      <Form layout="vertical" name="form_in_modal" onFinish={onFinish}>
        <Form.Item
          name="airport"
          label="Airport Name"
          rules={[{ required: true, message: 'Please input Airport name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="flight"
          label="Flight No."
          rules={[{ required: true, message: 'Please input flight!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="time" label="Time">
          <TimePicker />
        </Form.Item>

        <Form.Item
          name="chennai_at"
          label="Date of Arrival at Chennai"
          rules={[{ required: true, message: 'Please input Date of Arrival at Chennai!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="departure_at"
          label="Date of Departure"
          rules={[{ required: true, message: 'Please input Departure date!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="departure_flight"
          label="Departure Flight No."
          rules={[{ required: true, message: 'Please input Departure flight!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Radio.Group>
            <Radio value={1}>Single Room </Radio>
            <Radio value={2}>Double Room </Radio>
          </Radio.Group>
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

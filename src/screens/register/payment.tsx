import React, { useState } from 'react';
import { Form, Row, Col, Button, message, Input, Breadcrumb, Upload, DatePicker } from 'antd';
import AppLayout from '@layout/app';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function PaymentDetail() {
  const history = useHistory();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    history.replace('/payment-status');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const IPhotoProps = {
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

  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>Chess Olympiad 2022</Breadcrumb.Item>
        <Breadcrumb.Item>Team Registration</Breadcrumb.Item>
        <Breadcrumb.Item>Upload Documents</Breadcrumb.Item>
        <Breadcrumb.Item>Payment Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ marginTop: 20 }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row>
            <Col span={8}>
              <Form.Item label="Amount">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Payemnt At">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Upload Payment Receipt" name="receipt">
            <Upload {...IPhotoProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AppLayout>
  );
}
import AppLayout from '@layout/app';
import { Button, Checkbox, Col, Form, Input, Row, message, notification } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();

  const onFinish = (values: any) => {
    openNotification();
    history.push('/teams/register');
    return;
  };

  const openNotification = () => {
    notification.success({
      message: 'Login Success',
      description: 'Your login session started',
      onClick: () => {
        console.log('Notification Clicked!');
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <AppLayout>
      <Row>
        <Col span={8}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AppLayout>
  );
}

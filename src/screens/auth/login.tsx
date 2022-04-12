import AppLayout from '@layout/app';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  notification,
  Typography,
  Card,
  Divider
} from 'antd';
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ILoginUser } from 'src/schemas/IUser';
import * as authToken from '@utils/userAuth';

export default function Login() {
  const history = useHistory();

  const onFinish = async (values: any) => {
    const { data } = await axios.post<ILoginUser>(`login`, values);
    if (data) {
      authToken.storeToken(data.token);
      openNotification(data);
      history.push('/teams/register');
    }
    return;
  };

  const openNotification = (data: ILoginUser) => {
    notification.success({
      message: 'Login Success',
      description: data.message,
      onClick: () => {
        console.log('Notification Clicked!');
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row align="middle" justify="center" style={{ margin: '5rem 0' }}>
        <Col xs={20} sm={16} md={12} lg={8} xl={8}>
          <Card>
            <Typography>
              <Typography.Title level={3}>Sign in to Chess Olympiad</Typography.Title>
              <Typography.Paragraph>
                Please Enter the login detail which you received on your email.
              </Typography.Paragraph>
            </Typography>
            <Divider />
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
                <Input type="email" size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

              <Typography>
                <Typography.Paragraph>
                  <strong>Contact US</strong> If you facing any issues, please contact us.
                </Typography.Paragraph>
              </Typography>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, Col, Form, Input, message, Row, Typography, Space} from 'antd';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Loader from '@components/loader/Loader';

const { Text} = Typography;

export default function OtherPayment() {
    const [isloading, setIsloading] = useState(false);
    const history = useHistory();

    const [btnLoading, setbtnLoading] = useState(false);
    const onFinish = (values: any) => {
        const fullName = values.full_name.split(' ');
        const last_name = fullName.pop();
        const first_name = fullName.join(' ');
        const data = {
            ...values,
            first_name,
            last_name
        }
        handleSubmitForm(data);
    };

    const handleSubmitForm = async (values: JSON) => {
        const show = message.loading('Saving Values ...', 0);
        setbtnLoading(true);
        try {
            const { data } = await Axios.post(`other-payment`, values);
            setTimeout(show, 0);
            history.push('checkout', { order_id: data?.order?.id });
            setbtnLoading(false);
        } catch (error) {
            setTimeout(show, 0);
            setbtnLoading(false);
            if (error?.response?.data?.errors) {
                const { email, mobile } = error?.response?.data?.errors;
                if (email) message.warning(email?.[0]);
                if (mobile) message.warning(mobile?.[0]);
            }
        }
    }

    return (
        <AppLayout>
            <Breadcrumb>
                <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
                <Breadcrumb.Item>Other Payment</Breadcrumb.Item>
            </Breadcrumb>
            {isloading ? <Loader /> :
                <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical" style={{ marginTop: '1rem' }}>
                      <Typography.Title>Make a payment to All India Chess Federation</Typography.Title>
                      <Space direction="vertical">
                        <Text>This facility allows players, arbiters, trainers or anyone to make payments to AICF, if any custom amount payment is required to make. You can send the snapshot after making the payment along with your subject mail to quickly update in your account.
                        </Text>
                      </Space>
                    <>
                        <Row gutter={[30, 20]} >
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    name="full_name"
                                    label="Full Name"
                                    rules={[{ required: true, message: 'Please input your full name!' }]}
                                >
                                    <Input placeholder="Full name" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[30, 20]}>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter valid email' }
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="mobile"
                                    label="Mobile Number"
                                    rules={[
                                        { required: true, message: 'Please input your phone number!' },
                                        { max: 10, min: 10, message: 'Please enter valid phone number!' }
                                    ]}
                                >
                                    <Input type="number" placeholder="Mobile number" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[30, 20]}>
                            <Col span={24}>
                                <Form.Item
                                    name="amount"
                                    label="Amount (INR)"
                                    rules={[
                                        { required: true, message: 'Please input amount!' },
                                    ]}
                                >
                                    <Input placeholder="Amount" type="number" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="message"
                                    label="Payment For"
                                    rules={[
                                        { required: true, message: 'Please input your payment for!' },
                                    ]}
                                >
                                    <Input.TextArea placeholder="Please mention the purpose like Fee payment or Donation" rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '30px' }}>
                            <Col>
                                <Button type="primary" size="large" htmlType="submit" loading={btnLoading}>
                                    Pay Now
                                </Button>
                                <Typography.Paragraph style={{marginTop:'1rem'}}>
                                  <small>(Credit Card, Debit, Netbanking accepted)</small>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                    </>

                </Form>}
        </AppLayout>
    );
}

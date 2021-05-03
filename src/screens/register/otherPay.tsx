import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, Col, Form, Input, message, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Loader from '@components/loader/Loader';

export default function OtherPayment() {
    const [isloading, setIsloading] = useState(false);
    const history = useHistory();

    const [btnLoading, setbtnLoading] = useState(false);
    const onFinish = (values: any) => {
        handleSubmitForm(values);
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
                <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical" >
                    <>
                        <Row gutter={[30, 20]} style={{ marginTop: '2rem' }}>
                            <Col span={8}>
                                <Form.Item
                                    name="first_name"
                                    label="First Name"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input placeholder="First name" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="middle_name" label="Middle Name" >
                                    <Input placeholder="Middle name" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    name="last_name"
                                    label="Last Name"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input placeholder="Last name" />
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
                                <Input.TextArea rows={4}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '30px' }}>
                            <Col>
                                <Button type="primary" size="large" htmlType="submit" loading={btnLoading}>
                                    Submit Form
                                </Button>
                            </Col>
                        </Row>
                    </>

                </Form>}
        </AppLayout>
    );
}


const dateFormat = 'DD-MM-YYYY';
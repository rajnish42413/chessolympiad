import React, { useEffect, useState } from 'react';
import { Button, Layout, Result, message, Row, Col, Descriptions } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import Axios from 'axios';
import Loader from '@components/loader/Loader';
import { IContact } from '../../schemas/IContact';
import AppHeader from '@layout/header';



// tslint:disable-next-line:function-name
export default function Checkout() {
    const history = useHistory();
    const { state }: any = useLocation();
    const { contact_id }: any = state;
    const [btnLoading, setbtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState({} as any);
    const [contact, setContact] = useState({} as IContact);

    const getData = async () => {
        const { data } = await Axios.get(`players/${contact_id}`);
        if (data) {
            const { order, player } = data;

            if (!order) {
                message.warning("Order Detail not found or Invalid");
                return history.go(-1);
            }
            setContact(player);
            setOrder(order);
        }
    }

    // const handleCheckout = async (response: any) => {
    //     console.log(response);
    //     setbtnLoading(true);
    //     const value = {
    //         payment_response_id: response.razorpay_payment_id,
    //         channel: 'razorpay',
    //     };
    //     try {
    //         const { data } = await Axios.put(`orders/${order?.id}`, value);
    //         history.push('/payment/status', data);
    //         setbtnLoading(false);
    //         return;
    //     } catch (error) {
    //         setbtnLoading(false);
    //     }
    // };

    // const handlePayment = async () => {
    //     if(!contact){
    //         message.error("Contact detail no found in our database");
    //     }

    //     if(!order?.amount){
    //       message.error("Order Amount not found");
    //     }

    //     const amount = order.amount;
    //     const options = {
    //         key: "rzp_test_hNtKQvpYRE730Z", 
    //         amount: amount.toString(),
    //         currency: "INR",
    //         name: "ALL INDIA CHESS FEDERATION",
    //         description: "ALL INDIA CHESS FEDERATION",
    //         order_id: order?.order_id,
    //         handler(response: any) {
    //             console.log(response);
    //             handleCheckout(response);
    //         },
    //         prefill: {
    //             name: contact?.first_name,
    //             email: contact?.email,
    //             contact: contact?.mobile,
    //         },
    //         notes: {
    //             address: "ALL INDIA CHESS FEDERATION PAYMENT",
    //         },
    //         theme: {
    //             color: "#fff",
    //         },
    //     };
    //     const rzp = new (window as any).Razorpay(options);
    //     rzp.open();
    // };

    useEffect(() => {
        if (!contact_id) return history.go(-1);
        setIsLoading(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        getData();
        setIsLoading(false);
    }, [history, contact_id]);


    return (
        <Layout style={{ backgroundColor: '#fff' }}>
            <AppHeader />
            { isLoading ? <Loader /> :
                <Layout.Content>
                    <Row justify="center" align="middle">
                        <Col span={12}>
                            <Descriptions title="Select Payment Method" bordered={true} column={1} style={{margin:'2rem 0'}}>
                                <Descriptions.Item label="Order ID">{order?.id}</Descriptions.Item>
                                <Descriptions.Item label="Amount">{order?.amount}/-</Descriptions.Item>
                                <Descriptions.Item label="Convenienc Fee">0/-</Descriptions.Item>
                                <Descriptions.Item label="Name">{contact?.first_name} {contact?.last_name}</Descriptions.Item>
                                <Descriptions.Item label="Email" span={2}>{contact?.email}</Descriptions.Item>
                                <Descriptions.Item>[Online Credit / Debit / Netbanking]</Descriptions.Item>
                            </Descriptions>
                            <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
                                <input type="hidden" name="key_id" value="rzp_test_hNtKQvpYRE730Z" />
                                <input type="hidden" name="order_id" value={order?.id} />
                                <input type="hidden" name="amount" value={order.amount} />
                                <input type="hidden" name="name" value="PRS - ALL INDIA CHESS FEDERATION" />
                                <input type="hidden" name="description" value="PRS - ALL INDIA CHESS FEDERATION" />
                                <input type="hidden" name="prefill[email]" value={contact?.email} />
                                <input type="hidden" name="prefill[contact]" value={contact?.mobile} />
                                <input type="hidden" name="notes[transaction_id]" value="transaction_1234" />
                                <input type="hidden" name="callback_url" value={"http://prs.aicf.in/"} />
                                <Button loading={btnLoading} type="primary" size="large" htmlType="submit">Pay Now</Button>
                            </form>
                        </Col>
                    </Row>

                </Layout.Content>}
        </Layout>
    )
}

import React, { useEffect, useState } from 'react';
import { Button, Layout, Row, Col, Descriptions, Space } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Loader from '@components/loader/Loader';
import AppHeader from '@layout/header';
import { RZ_KEY } from '@constants/general';



// tslint:disable-next-line:function-name
export default function Checkout() {
    const history = useHistory();
    const { state }: any = useLocation();
    const { order_id }: any = state;
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState({} as any);
    const contact = order?.user;

    const getData = async () => {
        setIsLoading(true);
        try {
            const { data } = await Axios.get(`orders/${order_id}/checkout`);
            setOrder(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    const getAmount = ():number => {
       if(!order?.amount) return 0;
       const amount = (+(order.amount) * 100);
       return amount;
    }

    useEffect(() => {
        if (!order_id) return history.go(-1);
        getData();
    // eslint-disable-next-line
    }, [order_id,history]);


    return (
        <Layout style={{ backgroundColor: '#fff' }}>
            <AppHeader />
            { isLoading ? <Loader /> :
                <Layout.Content>
                    <Row justify="center" align="middle" style={{marginBottom:'2rem'}}>
                    <Col xs={20} sm={20} md={12} lg={12} xl={12}>
                            <Descriptions title="Select Payment Method" bordered={true} column={1} style={{margin:'2rem 0'}}>
                                <Descriptions.Item label="Order ID">{order?.id}</Descriptions.Item>
                                <Descriptions.Item label="Amount">{order?.amount}/-</Descriptions.Item>
                                <Descriptions.Item label="Convenience Fee">0/-</Descriptions.Item>
                                <Descriptions.Item label="Name">{contact?.first_name} {contact?.last_name}</Descriptions.Item>
                                <Descriptions.Item label="Email" span={2}>{contact?.email}</Descriptions.Item>
                                <Descriptions.Item>[Online Credit / Debit / Netbanking]</Descriptions.Item>
                            </Descriptions>

                            <Space size="middle">
                                <Button size="large" onClick={()=> history.go(-1)}>Back</Button>
                                <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
                                <input type="hidden" name="key_id" value={RZ_KEY} />
                                <input type="hidden" name="order_id" value={order?.order_id} />
                                <input type="hidden" name="amount" value={getAmount()} />
                                <input type="hidden" name="currency" value={"INR"} />
                                <input type="hidden" name="name" value="PRS - ALL INDIA CHESS FEDERATION" />
                                <input type="hidden" name="description" value="PRS - ALL INDIA CHESS FEDERATION" />
                                <input type="hidden" name="prefill[email]" value={contact?.email} />
                                <input type="hidden" name="prefill[contact]" value={contact?.mobile} />
                                <input type="hidden" name="notes[transaction_id]" value="transaction_1234" />
                                <input type="hidden" name="callback_url" value={`https://admin.aicf.in/api/orders/${order?.id}`} />
                                <Button type="primary" size="large" htmlType="submit">Pay Now</Button>
                            </form>
                            </Space>
                        </Col>
                    </Row>
                </Layout.Content>}
        </Layout>
    )
}

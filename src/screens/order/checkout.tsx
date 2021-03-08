import React, { useEffect, useState } from 'react';
import { Button, Layout, Result, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import Axios from 'axios';



// tslint:disable-next-line:function-name
export default function Checkout() {
    const history = useHistory();
    const { state }:any = useLocation();
    const {contact, order}: any = state;
    const [btnLoading, setbtnLoading] = useState(false);

    const handleCheckout = async (response: any) => {
        console.log(response);
        setbtnLoading(true);
        const value = {
            payment_response_id: response.razorpay_payment_id,
            channel: 'razorpay',
        };
        try {
            const { data } = await Axios.put(`orders/${order?.id}`, value);
            history.push('/payment/status', data);
            setbtnLoading(false);
            return;
        } catch (error) {
            setbtnLoading(false);
        }
    };

    const handlePayment = async () => {
        if(!contact){
            message.error("Contact detail no found in our database");
        }
        if(!order?.amount){
          message.error("Order Amount not found");
        }
        const amount = order.amount;
        const options = {
            key: "rzp_test_hNtKQvpYRE730Z", 
            amount: amount.toString(),
            currency: "INR",
            name: "ALL INDIA CHESS FEDERATION",
            description: "ALL INDIA CHESS FEDERATION",
            order_id: order?.order_id,
            handler(response: any) {
                console.log(response);
                handleCheckout(response);
            },
            prefill: {
                name: contact?.name,
                email: contact?.email,
                contact: contact?.mobile,
            },
            notes: {
                address: "ALL INDIA CHESS FEDERATION PAYMENT",
            },
            theme: {
                color: "#fff",
            },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        if (!order) return history.go(-1);
    }, [history, order]);


    return (
        <Layout style={{backgroundColor:'#fff',paddingTop:'5vh'}}>
            <Layout.Content>
                <Result
                    status="success"
                    icon={<SmileOutlined />}
                    title="Successfully Register to AICF!"
                    subTitle={`Email: ${contact?.email}, Phone Number: ${contact?.mobile}`}
                    extra={[
                        <Button onClick={handlePayment} loading={btnLoading} type="primary" size="large" key="1">Pay Now</Button>,
                    ]}
                />
            </Layout.Content>
        </Layout>
    )
}

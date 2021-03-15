import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Layout, Result, message, Space, Row, Col } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import AppHeader from '@layout/header';
import Axios from 'axios';
import { PlayerName } from '../../utils/helpers';
import Loader from '@components/loader/Loader';

// tslint:disable-next-line:function-name
function PaymentStatus(props: any) {
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const orderId = query.get('orderId');
  const status = query.get('status');
  const description = query.get('description');

  const [OrderData, setOrderData] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const { order, payment, player } = OrderData;

  const [paymentStatus, setPaymentStatus] = useState(status);

  useEffect(() => {
    getOrder();
  }, [orderId]);

  const getOrder = async (rz_pay:boolean = false) => {
    if (!orderId) return message.error('Order not found');
    setLoading(true);
    const { data } = await Axios.get(`orders/${orderId}?check_rz_pay=${rz_pay}`);
    const { order, payment, player } = data;
    if(data?.status) setPaymentStatus(data.status);
    setOrderData(data);
    setLoading(false);
  };

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <AppHeader />
      {loading ? <Loader /> :
        <Layout.Content style={{ padding: '30px' }}>
          <Result
            status={status === 'paid' ? 'success' : 'error'}
            title={description ? description : 'Payment Successfull!'}
            subTitle={<p>
              <b>OrderID:</b> {orderId} <br />
              <b>Name:</b> {PlayerName(player?.first_name, player?.middle_name, player?.last_name)} <br />
              <b>Amount:</b> {order?.amount / 100}/- <br />
              <b>Response:</b> {description} <br />
              <b>Status:</b> {description} <br />
            </p>}
            extra={[
              <Space size="middle">
                <Button key="home" type="primary" onClick={() => history.replace('/')}>
                  Home
            </Button>
                <Button onClick={()=>getOrder(true)}>Check with Bank</Button>
              </Space>

            ]}
          />

        </Layout.Content>}
    </Layout>
  );
}

export default PaymentStatus;

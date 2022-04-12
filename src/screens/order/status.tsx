import React, { useEffect, useState } from 'react';
import { Button, Layout, Result, message, Space } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import AppHeader from '@layout/header';
import Axios from 'axios';
import { PlayerName } from '../../utils/helpers';
import Loader from '@components/loader/Loader';
import { IOrderDetail } from '../../schemas/IOrderDetail';

function PaymentStatus(props: any) {
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const orderId = query.get('orderId');

  const [OrderData, setOrderData] = useState({} as IOrderDetail);
  const [loading, setLoading] = useState(true);
  const { order ,status } = OrderData;

  useEffect(() => {
    getOrder();
  }, [orderId]);

  const getOrder = async (rz_pay:boolean = false) => {
    if (!orderId) return message.error('Order not found');
    setLoading(true);
    const { data } = await Axios.get(`orders/${orderId}?check_rz_pay=${rz_pay}`);
    setOrderData(data);
    setLoading(false);
  };

  const getDesc = (status:number):string =>{
    if(status ===1) return "Payment Successfully Completed!";
    return "Payment Failed!";
  }

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <AppHeader />
      {loading ? <Loader /> :
        <Layout.Content style={{ padding: '30px' }}>
          {order && 
          <Result
            status={order.status === 1 ? 'success' : 'error'}
            title={order?.status === 1 ? "Payment Successfully Completed!" : 'Payment Failed!'}
            subTitle={<p>
              <b>OrderID:</b> {OrderData?.order.id} <br />
              <b>Name:</b> {PlayerName(order?.user?.first_name, order?.user?.middle_name, order?.user?.last_name)} <br />
              <b>Amount:</b> {order?.amount}/- <br />
              <b>Response:</b> {getDesc(order?.status)} <br />
              <b>Status:</b> {status?.status} <br />
            </p>}
            extra={[
              <Space size="middle">
                <Button key="home" type="primary" onClick={() => history.replace('/')}>
                  Home
            </Button>
                <Button onClick={()=>getOrder(true)}>Check with Bank</Button>
              </Space>

            ]}
          />}
        </Layout.Content>}
    </Layout>
  );
}

export default PaymentStatus;

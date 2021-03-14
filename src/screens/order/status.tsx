import React from 'react';
import { Button, Layout, Result } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import AppHeader from '@layout/header';

// tslint:disable-next-line:function-name
function PaymentStatus(props: any) {
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const orderId = query.get('orderId');
  const status = query.get('status');
  const description = query.get('description');

  return (
    <Layout>
      <AppHeader />
      <Layout.Content style={{ padding: '30px' }}>
        <Result
          status={status === 'paid' ? 'success' : 'error'}
          title={description ? description : 'Payment Successfull!'}
          subTitle={`Order ID: #${orderId}`}
          extra={[
            <Button key="home" type="primary" onClick={() => history.replace('/')}>
              Home
            </Button>
          ]}
        />
      </Layout.Content>
    </Layout>
  );
}

export default PaymentStatus;

import React from 'react';
import { Button, Layout, Result } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

// tslint:disable-next-line:function-name
function PaymentStatus(props: any) {
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const orderId = query.get('orderId');

  return (
    <Layout>
      <Layout.Content style={{ padding: '30px' }}>
        <Result
          status="success"
          title="Payment Successfully!"
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

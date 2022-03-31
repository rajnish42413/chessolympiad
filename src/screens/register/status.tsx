import React from 'react';
import { Button, Layout, message, Result, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import AppHeader from '@layout/header';

export default function PaymentStatus() {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const IPhotoProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <AppHeader />
      <Result
        status={'success'}
        title={
          'We saved your team!, we will confirm your payment within 24hr by emil and phone number,'
        }
        subTitle={
          <p>
            <b>PaymentID:</b> OLYMPD39883737 <br />
            <b>Federation Name:</b> Indian Chess Federation <br />
            <b>Amount:</b> Euro 700/- <br />
            <b>Status:</b> Pending <br />
          </p>
        }
        extra={[
          <Space size="middle">
            <Button key="home" type="primary" onClick={() => history.replace('/')}>
              Home{' '}
            </Button>
            <Button>Refresh</Button>
          </Space>
        ]}
      />
    </Layout>
  );
}

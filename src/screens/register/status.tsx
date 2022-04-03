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
        title={'Awesome, your entry has been submitted to organising committee.'}
        subTitle={
          <p>
            <b>PaymentID:</b> OLYMPD39883737 <br />
            <b>Federation Name:</b> All India Chess Federation <br />
            <b>Amount:</b> Euro 100/- <br />
            <b>Status:</b> Submitted for approval <br />
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

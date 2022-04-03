import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import RegisterForm from '@components/RegisterForm';
import { Button, Descriptions, Divider, PageHeader, Typography } from 'antd';
import axios from 'axios';
import { IFederation } from '../../schemas/IFederation';
import Loader from '@components/loader/Loader';

export default function Register(props: any) {
  const [federations, setFederations] = useState([] as Array<IFederation>);

  return (
    <AppLayout>
      {/* <Breadcrumb>
        <Breadcrumb.Item>Chess Olympiad 2022</Breadcrumb.Item>
        <Breadcrumb.Item>Team Registration</Breadcrumb.Item>
      </Breadcrumb> */}
      <PageHeader
        style={{ padding: 0 }}
        ghost={false}
        onBack={() => window.history.back()}
        title="Open Section"
        subTitle="Team Registration"
        extra={[]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="App ID">#OLY2022-0231</Descriptions.Item>
          <Descriptions.Item label="Creation Time">2022-04-03</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      {federations ? <RegisterForm federations={federations} /> : <Loader />}
      <Divider />
    </AppLayout>
  );
}

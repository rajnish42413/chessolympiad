import React, { useState } from 'react';
import AppLayout from '@layout/app';
import RegisterForm from '@components/RegisterForm';
import { Descriptions, Divider, PageHeader } from 'antd';
import { IFederation } from '../../schemas/IFederation';
import Loader from '@components/loader/Loader';
import { useLocation,useParams } from 'react-router-dom';

export default function Register(props: any) {
  const { state }:any = useLocation();
  const type = state?.type;
  const [federations, setFederations] = useState([] as Array<IFederation>);
  const {id}:any = useParams();
  
  return (
    <AppLayout>
      <PageHeader
        style={{ padding: 0 }}
        ghost={false}
        onBack={() => window.history.back()}
        title={type?.name}
        subTitle="Insert Application"
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

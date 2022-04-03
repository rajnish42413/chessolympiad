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
        title="India"
        subTitle="All India Chess Federation"
        extra={[]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Divider />
      {federations ? <RegisterForm federations={federations} /> : <Loader />}
      <Divider />
      <Typography>
        <Typography.Title level={4}>
          Fee to be Paid: <span>7 * 100 euro = 700 euro</span>
        </Typography.Title>
        <Typography.Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established
          fact that a reader will be distracted by the readable content of a page when looking at
          its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content here', making it look
          like readable English. Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web
          sites still in their infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Contrary to popular belief,
          Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
          professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
          words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
          cl
        </Typography.Paragraph>
        <Divider />
      </Typography>
    </AppLayout>
  );
}

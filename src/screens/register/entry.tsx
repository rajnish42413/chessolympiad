import React from 'react';
import AppLayout from '@layout/app';
import { Button, Col, Descriptions, Divider, PageHeader, Row, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';

export default function Entry(props: any) {
  return (
    <AppLayout>
      <PageHeader
        style={{ padding: 0 }}
        ghost={false}
        onBack={() => window.history.back()}
        title="United States"
        subTitle="Chess Olympiad Registration"
        extra={[
          <>
            <Button key="1">View entries</Button>
            <Button key="1" type="primary">
              LogOut
            </Button>
          </>
        ]}
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
      <Row style={{ marginTop: 20 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} key={1}>
          <label>Choose registration type</label>
          <Select placeholder="Select registration type" style={{ width: '100%' }}>
            <Select.Option value="Open Section">Open Section</Select.Option>
            <Select.Option value="Women Section">Women Section</Select.Option>
            <Select.Option value="General Assembly">General Assembly</Select.Option>
            <Select.Option value="Visitors">Visitors</Select.Option>
            <Select.Option value="Federation Officials">Federation Officials</Select.Option>
            <Select.Option value="Congress Meetings">Congress Meetings</Select.Option>
          </Select>
        </Col>
      </Row>
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
      <Link to="/teams/entry">
        <Button type="primary" size="large" style={{ margin: '20px 0' }}>
          Add Entry
        </Button>
      </Link>
    </AppLayout>
  );
}

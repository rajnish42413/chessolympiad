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
        // onBack={() => window.history.back()}
        title="India"
        subTitle="Logged in"
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
          <Descriptions.Item label="Country">India</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>All India Chess Federation</a>
          </Descriptions.Item>
          <Descriptions.Item label="Representative">Bharat Singh Chauhan</Descriptions.Item>
          <Descriptions.Item label="Coordinator">Naresh Sharma</Descriptions.Item>
          <Descriptions.Item label="Visa Status">On Arrival</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Divider />
      <Typography>
        <Typography.Title level={4}>Instructions</Typography.Title>
        <Typography.Paragraph>
          Please choose the appropriate registration type to add an entry for Chess Olympiad 2022.
          <li>Open Section - To register the Open Team</li>
          <li>Women Section - To register the Womens Team</li>
          <li>
            General Assembly, Delegates, Federation Officials, Congress Meetings - You would need to
            contact the organising committee to get a special invitation code to register.
          </li>
        </Typography.Paragraph>
        <Divider />
      </Typography>
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
      <Link to="/teams/entry">
        <Button type="primary" size="large" style={{ margin: '20px 0' }}>
          Add Entry
        </Button>
      </Link>
    </AppLayout>
  );
}

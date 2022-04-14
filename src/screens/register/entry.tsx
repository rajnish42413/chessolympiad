import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Button, Col, Descriptions, Divider, PageHeader, Row, Select, Typography } from 'antd';
import { APPLICATION_TYPES } from '../../constants/general';
import { useHistory } from 'react-router-dom';

export default function Entry(props: any) {
  const history = useHistory();
  const [typeId, setTypeId] = useState(0);

  const handleSubmit = () => {
    history.push('/teams/entry', { type: APPLICATION_TYPES.find(i => i.value == typeId) });
    return;
  };

  const onChange = (value: any) => {
    setTypeId(value);
  };

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
          <Select
            placeholder="Select registration type"
            style={{ width: '100%' }}
            inputValue={`${typeId}`}
            onChange={onChange}
          >
            {APPLICATION_TYPES.map(i => (
              <Select.Option value={i.value}>{i.name}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Button type="primary" size="large" style={{ margin: '20px 0' }} onClick={handleSubmit}>
        Add Entry
      </Button>
    </AppLayout>
  );
}

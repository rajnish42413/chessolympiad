import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

interface IProps {
  addPlayer: any;
}
export default function AddPlayerInTeam(props: IProps) {
  const [form] = Form.useForm();

  const onSubmitForm = (values: any) => {
    props.addPlayer(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="add-players-form"
      form={form}
      onFinish={onSubmitForm}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ margin: '20px 0', width: '100%' }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <Form.Item label="FIDE ID" name="fide_id">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={3} xl={4}>
          <Form.Item
            label="Player Name"
            name="name"
            rules={[{ required: true, message: 'Please input player name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={3} xl={4}>
          <Form.Item label="Role" name="type_id" initialValue={'Player'}>
            <Select>
              <Select.Option value={'Player'}>Player (FIDE ID Required)</Select.Option>
              <Select.Option value={'Accompanying Person'}>Accompanying Person</Select.Option>
              <Select.Option value={'Captain'}>Captain</Select.Option>
              <Select.Option value={'Coach'}>Coach</Select.Option>
              <Select.Option value={'Doctor'}>Doctor</Select.Option>
              <Select.Option value={'Head of Delegation'}>Head of Delegation</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <Form.Item label="Gender" name="gender" initialValue={'M'}>
            <Select>
              <Select.Option value={'M'}>M</Select.Option>
              <Select.Option value={'F'}>F</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <Form.Item label="Rating" name="rating">
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <Form.Item label="Board No." name="rank">
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <Form.Item style={{ marginLeft: 20 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

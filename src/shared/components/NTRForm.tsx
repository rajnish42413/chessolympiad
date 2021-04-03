import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, DatePicker } from 'antd';
import moment from 'moment';
import Loader from './loader/Loader';

const dateFormat = 'DD-MM-YYYY';

interface IProps {
  btnLoading: boolean;
}

export default function NTRFormItems(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Row gutter={[30, 20]}>
        <Col span={8}>
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="First name" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="middle_name" label="Middle Name">
            <Input placeholder="Middle name" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { max: 10, min: 10, message: 'Please enter valid phone number!' }
            ]}
          >
            <Input type="number" placeholder="Mobile number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 3 */}

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            name="son_daughter_of"
            label="Son/Daugher of"
            rules={[
              {
                required: true,
                message: 'Please add your fathers name!'
              }
            ]}
          >
            <Input placeholder="father/mother or parent name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="relationship"
            label="Relationship"
            rules={[{ required: true, message: 'Select Relationship' }]}
          >
            <Select options={relation} placeholder="Select Relationship" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 4 */}

      <Row gutter={[30, 40]}>
        <Col span={12}>
          <Form.Item name="mother_tounge" label="Mother Tounge">
            <Input placeholder="eg. Hindi ,English or ...." />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Add Gender' }]}
          >
            <Select options={gender} placeholder="Select Gender" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 5 */}

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            name="date_of_birth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Select DOB' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showToday={false}
              disabledDate={disabledDate}
              format={dateFormat}
              placeholder="DD-MM-YYYY"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address" label="Address">
            <Input.TextArea rows={1} placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col>
          <Button type="primary" size="large" htmlType="submit">
            Submit Form
          </Button>
        </Col>
      </Row>
    </>
  );
}

function disabledDate(current: any) {
  return current && current > moment().endOf('day');
}

const gender = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Other', value: 'O' }
];

const relation = [
  { label: 'Father', value: 'Father' },
  { label: 'Mother', value: 'Mother' },
  { label: 'Other', value: 'Other' }
];

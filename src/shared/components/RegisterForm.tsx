import React from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Upload,
  Radio,
  DatePicker,
  message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';

interface IProps {
  btnLoading: boolean | { delay?: number | undefined } | undefined;
  default?: any;
}

// tslint:disable-next-line:function-name
export default function RegisterFormItems(Props: IProps) {
  const { btnLoading } = Props;
  const props = {
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
    <>
      <Row gutter={[30, 20]}>
        <Col span={8}>
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
            initialValue={Props?.default?.first_name}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item initialValue={Props?.default?.middle_name} name="middle_name" label="Middle Name">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
            initialValue={Props?.default?.last_name}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            initialValue={Props?.default?.email}

            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue={Props?.default?.mobile}

            name="mobile"
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { max: 10, min: 10, message: 'Please enter valid phone number!' }
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 3 */}

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            initialValue={Props?.default?.son_daughter_of}

            name="son_daughter_of"
            label="Son/Daugher of"
            rules={[
              {
                required: true,
                message: 'Please add your fathers name!'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            initialValue={Props?.default?.relationship}

            name="relationship"
            label="Relationship"
            rules={[{ required: true, message: 'Select Relationship' }]}
          >
            <Select options={relation} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 4 */}

      <Row gutter={[30, 40]}>
        <Col span={12}>
          <Form.Item 
            initialValue={Props?.default?.mother_tounge}
          name="mother_tounge" label="Mother Tounge">
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            initialValue={Props?.default?.gender}
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Add Gender' }]}
          >
            <Select options={gender} />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 5 */}

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item
            // initialValue={Props?.default?.DOB}
          
            name="DOB"
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
          <Form.Item 
            initialValue={Props?.default?.address}
          
          name="address" label="Address">
            <Input.TextArea rows={1} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item 
            initialValue={Props?.default?.city}

          name="city" label="City" rules={[{ required: true, message: 'Add City' }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item

initialValue={Props?.default?.district}

            name="district"
            label="District"
            rules={[{ required: true, message: 'Add City' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[30, 20]}>
        <Col span={12}>
          <Form.Item 
            initialValue={Props?.default?.state}

          name="state" label="State" rules={[{ required: true, message: 'Add City' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 6 */}

      <Row gutter={[200, 20]} style={{ marginTop: 10, marginBottom: 20 }}>
        <Col>
          <h3>Player Type</h3>
          <Form.Item name="player_type">
            <Checkbox value="player">Player</Checkbox>
            <Checkbox value="arbiter">Arbiter</Checkbox>
            <Checkbox value="coach">Coach</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <h3>Are you a PIO/OCI</h3>
          <Form.Item name="POI">
            <Radio>Yes</Radio>
            <Radio>No</Radio>
          </Form.Item>
        </Col>
      </Row>

      {/* Row number 7 */}

      <Row style={{ marginTop: '30px' }}>
        <Col span={5}>
          <Upload {...props}>
            <Button type="default" icon={<UploadOutlined />}>
              Passport Size Photo
            </Button>
          </Upload>

          <p style={{ marginTop: 20 }}>
            (jpg, png or gif images only. 160x200 pixels (width x height). Maximum size 1000 KB)
          </p>
        </Col>
        <Col span={8} offset={4}>
          <Upload {...props}>
            <Button type="default" icon={<UploadOutlined />}>
              Birth Certificate
            </Button>
          </Upload>
          <p style={{ marginTop: 20 }}>(Maximum size 1000 KB)</p>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col>
          <Button type="primary" size="large" htmlType="submit" loading={btnLoading}>
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
  { label: 'Daughter', value: 'Daugher' },
  { label: 'Son', value: 'Son' },
  { label: 'Husband', value: 'Husband' },
  { label: 'Son', value: 'Son' },
  { label: 'Brother', value: 'Brother' },
  { label: 'Sister', value: 'Sister' }
];

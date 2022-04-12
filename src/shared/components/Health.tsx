import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Upload, message, Card, Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { IAppState } from '@redux/reducers';
import { UploadOutlined } from '@ant-design/icons';

function HealthDetail() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    const data = {
      ...values
    };
    handleSubmitForm(data);
  };

  const handleSubmitForm = async (values: JSON) => {
    console.log(values);
    return;
  };

  return (
    <Card title="HEALTH RECORDS" style={{ marginTop: '2rem' }}>
      <Form layout="vertical" name="form_in_modal" onFinish={onFinish}>
        <Row>
          <Col span={6}>
            <Form.Item name="rtpcr" label="Upload RT-PCR">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="antigen" label="Upload Antigen">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="vaccine_status" label="Upload Vaccine Status">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="issue_at"
              label="Date of RT-PCR"
              rules={[{ required: true, message: 'Please input date!' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary">Submit</Button>
      </Form>
    </Card>
  );
}
// First Name, Last Name, FIDE ID,  Country, Photo, Mobile Number, Email, Remove Visa Upload

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data
  };
};

export default HealthDetail;

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

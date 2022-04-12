import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Upload, message, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import { IAppState } from '@redux/reducers';
import { UploadOutlined } from '@ant-design/icons';

function PassportDetail() {
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
    <Card title="Passport Detail">
      <Form layout="vertical" name="form_in_modal" onFinish={onFinish}>
        <Form.Item
          name="passport_number"
          label="Passport Number"
          rules={[{ required: true, message: 'Please input Passport no!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="passport_name"
          label="Passport Name"
          rules={[{ required: true, message: 'Please input Passport name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="passport_copy" label="Passport copy">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="issue_at"
          label="Passport Issue At"
          rules={[{ required: true, message: 'Please input issue date!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="expire_at"
          label="Passport Expire At"
          rules={[{ required: true, message: 'Please input Expire date!' }]}
        >
          <DatePicker />
        </Form.Item>
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

export default PassportDetail;

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

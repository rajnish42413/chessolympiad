import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  Upload,
  Radio,
  message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from '../../constants/general';
import Axios from 'axios';
import Loader from './loader/Loader';
import { IPlayerType } from '../../schemas/IPlayertypes.d';
import { IContact } from '../../schemas/IContact.d';
import LocationAutoComplete from './LocationAutoComplete';


interface IProps {
  btnLoading: boolean;
  contact?: IContact;
  setPassportPhoto: any;
  setBirthCertificate: any;
}

export default function RenewForm(props: IProps) {
  const { btnLoading, contact, setPassportPhoto, setBirthCertificate } = props;
  const [playerTypes, setPlayerTypes] = useState<IPlayerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const IPassportPhotoProps = {
    name: 'image',
    action: `${API_URL}contacts/add-image`,
    headers: {
      authorization: 'authorization-text'
    },
    data: {
      type: "contact_passport_photo",
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const { response } = info?.file;
        const image = response?.image;
        if (image && image?.entity === "contact_passport_birth_certificate") {
          setBirthCertificate(image.id);
        }
        if (image && image?.entity === "contact_passport_photo") {
          setPassportPhoto(image.id);
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        const { errors } = info?.file?.response;
        if (errors) {
          const { image } = errors;
          if (image) message.warning(image?.[0]);
        }
      }
    }
  };


  const IBirtCertificateProps = {
    name: 'image',
    action: `${API_URL}contacts/add-image`,
    headers: {
      authorization: 'authorization-text'
    },
    data: {
      type: "contact_passport_birth_certificate",
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const { response } = info?.file;
        const image = response?.image;
        if (image && image?.entity === "contact_passport_birth_certificate") {
          setBirthCertificate(image.id);
        }
        if (image && image?.entity === "contact_passport_photo") {
          setPassportPhoto(image.id);
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const getData = async () => {
    const { data } = await Axios.get(`types`);
    setPlayerTypes(data);
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, [])

  return isLoading ? <Loader /> :
    <>
      <Row gutter={[30, 20]}>
        {contact?.first_name && <Col span={8}>
          <Form.Item
            name="first_name"
            label="First Name"
            initialValue={contact.first_name}
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="First name" readOnly={true} disabled={true} />
          </Form.Item>
        </Col>}

        {contact?.middle_name && <Col span={8}>
          <Form.Item name="middle_name" label="Middle Name" initialValue={contact.middle_name}>
            <Input placeholder="Middle name" readOnly={true} disabled={true} />
          </Form.Item>
        </Col>}

        {contact?.last_name && <Col span={8}>
          <Form.Item
            name="last_name"
            label="Last Name"
            initialValue={contact?.last_name}
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Last name" readOnly={true} disabled={true} />
          </Form.Item>
        </Col>}
      </Row>

      <Row gutter={[30, 20]}>
        {contact?.email && <Col span={12}>
          <Form.Item
            initialValue={contact?.email}
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>}
        {contact?.mobile && <Col span={12}>
          <Form.Item
            name="mobile"
            initialValue={contact?.mobile}
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { max: 10, min: 10, message: 'Please enter valid phone number!' }
            ]}
          >
            <Input type="number" placeholder="Mobile number" />
          </Form.Item>
        </Col>}
      </Row>

      {contact?.id && <Row gutter={[30, 20]}>
        <LocationAutoComplete state={contact?.state} city={contact?.city} district={contact?.district} />
      </Row>}


      <Row gutter={[200, 20]} style={{ marginTop: 10, marginBottom: 20 }}>
        <Col>
          <Form.Item
            name="player_type"
            label="Player Type"
            rules={[{ required: true }]}>
            <Checkbox.Group >
              {playerTypes?.map(item =>
                <Checkbox value={item.slug} key={item.slug}>{item.name}</Checkbox>
              )}
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="poi" label="Are you a PIO/OCI" initialValue={contact?.poi}>
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>


      <Row style={{ marginTop: '30px' }}>
        <Col span={5}>
          <Upload {...IPassportPhotoProps} multiple={false}>
            <Button type="default" icon={<UploadOutlined />} >
              Passport Size Photo
            </Button>
          </Upload>

          <p style={{ marginTop: 20 }}>
            (jpg, png images only. Maximum size 1000 KB)
          </p>
        </Col>
        <Col span={8} offset={4}>
          <Upload {...IBirtCertificateProps} multiple={false}>
            <Button type="default" icon={<UploadOutlined />}>
              Birth Certificate
            </Button>
          </Upload>
          <p style={{ marginTop: 20 }}>(PDF, JPEG, JPG, PNG documents only. Maximum size 1000 KB) (Optional)</p>
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
}




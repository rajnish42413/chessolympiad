import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Upload, message, notification, DatePicker, Spin } from 'antd';
import Loader from './loader/Loader';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { IPlayerDetail } from '../../schemas/IContact';
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from '@constants/general';
import LocationAutoComplete from './LocationAutoComplete';
import moment from 'moment';

interface IProps {
  btnLoading: boolean;
  setPlayerId: any,
  setBirthCertificate: any;
  setPassportPhoto: any;
  setBonafideCertificate:any;
}

export default function NTRSChoolForm(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState({} as IPlayerDetail);
  const { player, photo, location, birth_certificate} = playerData;
  const [searchloading, setSearchloading] = useState(false);
  const { setPlayerId, setBirthCertificate, setPassportPhoto, setBonafideCertificate} = props;

  const handlePlayerAICFID = async (value: string, event: any) => {
    if (!value) return;
    setSearchloading(true);
    const { data } = await Axios.get(`aicfid/${value}`);
    setPlayerData(data);
    setPlayerId(data?.player?.id);
    setSearchloading(false);
    return;
    if ((data?.membership_expired === false && data?.order_status === 1)) {
      setPlayerData(data);
      setPlayerId(data?.player?.id);
      setSearchloading(false);
    } else {
      openNotificationWithIcon();
      setSearchloading(false);
      return;
    }
  }
  const openNotificationWithIcon = () => {
    notification.error({
      message: 'Not AICF Active Member!',
      duration: 10,
      description:
        <> <p>Your membership is expired or not activated!, Please renew your membership to proceed futher.</p></>
    });
  };

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
        if (image) {
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
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const IBonafideProps = {
    name: 'image',
    action: `${API_URL}contacts/add-image`,
    headers: {
      authorization: 'authorization-text'
    },
    data: {
      type: "bonafide_certificate",
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const { response } = info?.file;
        const image = response?.image;
        if (image && image?.entity === "bonafide_certificate") {
          setBonafideCertificate(image.id);
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Row gutter={[30, 20]}>
        <Col xs={24} sm={24} md={8} lg={12} xl={12}>
          <Form.Item
            name="aicf_id"
            label="Enter AICF ID"
            rules={[
              { required: true, message: 'Please input your aicf_id!' },
            ]}
          >
            <Input.Search placeholder="AICF ID like: 24232DEL2021" enterButton="Fetch Details" onSearch={handlePlayerAICFID} loading={searchloading} />
          </Form.Item>
          <p>** (If you don't remember your AICF ID, please search <Link to="/players">here</Link>) **</p>
        </Col>
      </Row>

      {player && <Spin spinning={searchloading}>
        <Row gutter={[30, 20]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item name="middle_name" label="Middle Name">
              <Input placeholder="Middle name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
            </Form.Item >
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

        <Row gutter={[30, 40]}>
          <Col span={12}>
            <Form.Item
              name="mother_tounge" label="Mother Tounge" >
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
            <Form.Item
              name="address" label="Address">
              <Input.TextArea rows={1} placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[30, 20]}>
          <LocationAutoComplete/>
          <Col span={12}>
            <Form.Item
              name="fide_id"
              label="FIDE ID"
            >
              <Input placeholder="FIDE ID" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="category"
              label="Select Category Playing "
              rules={[{ required: true, message: 'Select Category Playing ' }]}
            >
              <Select options={categories} placeholder="Select Category Playing " />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="school_name"
              label="School Name"
              rules={[{ required: true, message: 'Enter school name' }]}
            >
              <Input placeholder="Enter school name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="school_location"
              label="School location"
              rules={[{ required: true, message: 'Enter school location' }]}
            >
              <Input placeholder="Enter school name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tornelo_email"
              label="Email ID registered with Tornelo"
              rules={[
                { required: true, message: 'Please input your tornelo email!' },
                { type: 'email', message: 'Please enter valid tornelo email' }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
      </Spin>}

      <Row style={{marginTop:'15px'}}>
        {player &&  <Col span={12}>
          <Upload {...IPassportPhotoProps} multiple={false}>
            <Button type="default" icon={<UploadOutlined />} >
              Passport Size Photo
            </Button>
          </Upload>
          <p style={{ marginTop: 20 }}>
            (jpg, png images only. Maximum size 1000 KB)
          </p>
        </Col>}

        {player &&  <Col span={12}>
          <Upload {...IBirtCertificateProps} multiple={false}>
            <Button type="default" icon={<UploadOutlined />}>
              Birth Certificate
            </Button>
          </Upload>
          <p style={{ marginTop: 20 }}>(PDF, JPEG, JPG, PNG documents only. Maximum size 1000 KB) (Optional)</p>
        </Col>}

        {/* <Col span={12}>
          <Upload {...IBonafideProps} multiple={false}>
            <Button type="default" icon={<UploadOutlined />}>
             Bonafide Certificate
            </Button>
          </Upload>
          <p style={{ marginTop: 20 }}>(PDF, JPEG, JPG, PNG documents only. Maximum size 1000 KB) </p>
        </Col> */}
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col>
          <Button type="primary" size="large" htmlType="submit" disabled={!player}>
            Proceed to Payment
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
  { label: 'Other', value: 'Other' },
];

const dateFormat = 'DD-MM-YYYY';

const categories = [
  { label: 'U17 OPEN', value: 'U17 OPEN' },
  { label: 'U17 GIRLS', value: 'U17 GIRLS' },
  { label: 'U15 OPEN', value: 'U15 OPEN' },
  { label: 'U15 GIRLS', value: 'U15 GIRLS' },
  { label: 'U13 OPEN', value: 'U13 OPEN' },
  { label: 'U13 GIRLS', value: 'U13 GIRLS' },
  { label: 'U11 OPEN', value: 'U11 OPEN' },
  { label: 'U11 GIRLS', value: 'U11 GIRLS' },
  { label: 'U09 OPEN', value: 'U09 OPEN' },
  { label: 'U09 GIRLS', value: 'U09 GIRLS' },
  { label: 'U07 OPEN', value: 'U07 OPEN' },
  { label: 'U07 GIRLS', value: 'U07 GIRLS' }
];
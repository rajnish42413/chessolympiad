import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, message, Select } from 'antd';
import Axios from 'axios';
import { Link } from 'react-router-dom';

interface IProps {
  btnLoading: boolean;
  setAicf: any;
  dLink: string;
}

export default function NTRCertificate(props: IProps) {
  const [searchloading, setSearchloading] = useState(false);
  const [aicf, setAicf] = useState('');
  const [event, setEvent] = useState('');

  const handlePlayerAICFID = async (value: string) => {
    if (!value) return;
    if(!event) message.error("Please select event");
    try {
      setSearchloading(true);
      const { data } = await Axios.post(`send-otp`, {aicf_id: value, event:event});
      if (data) {
        setAicf(data.aicf_id);
        props.setAicf(data.aicf_id);
      }
      message.success('OTP successfully send to your mobile number');
      setSearchloading(false);
    } catch (error) {
      setSearchloading(false);
    }
  };

  const handleSelectEvent = (value: string) => {
    if (!value) return;
    if (value) setEvent(value);
  }

  return (
    <>
      <Row gutter={[30, 20]}>
        <Col xs={24} sm={24} md={8} lg={12} xl={12}>
          <Form.Item
            name="event"
            label="Choose a Event"
            rules={[{ required: true, message: 'Click here to select' }]}
          >
            <Select placeholder="select event" onChange={handleSelectEvent}>
              {events?.map(e => <Select.Option value={e.event_code} key={e.event_code}>{e.event_name}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[30, 20]}>
        <Col xs={24} sm={24} md={8} lg={12} xl={12}>
          <Form.Item
            name="aicf_id"
            label="Enter AICF ID or FIDE ID"
            rules={[{ required: true, message: 'Please input your aicf_id or fide_id!' }]}
          >
            <Input.Search
              placeholder="AICF ID like: 24232DEL2021"
              enterButton="Fetch Details"
              onSearch={handlePlayerAICFID}
              loading={searchloading}
            />
          </Form.Item>
          <p>
            ** (If you don't remember your AICF ID, please search <Link to="/players">here</Link>)
            **
          </p>
        </Col>
      </Row>
      {aicf && (
        <>
          <Row gutter={[30, 20]}>
            <Col xs={24} sm={24} md={8} lg={12} xl={12}>
              <Form.Item
                name="otp"
                label="Enter OTP"
                rules={[
                  { required: true, message: 'Please input your otp!' },
                  { max: 6, min: 6, message: 'Please enter valid otp!' }
                ]}
              >
                <Input type="number" placeholder="OTP" />
              </Form.Item>
            </Col>
          </Row>
          <Button htmlType="submit" type="primary" style={{ marginRight: '15px' }}>
            Verify OTP
          </Button>
          {props.dLink && (
            <a
              className="ant-btn ant-btn-primary"
              href={props.dLink}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              View Certificate
            </a>
          )}
        </>
      )}
    </>
  );
}

const events = [
    {
      "event_code": "U18O",
      "event_name": "Online National Under 18 Open Chess Championship 2021"
    },
    {
      "event_code": "U18G",
      "event_name": "Online National Under 18 Girls Chess Championship 2021"
    },
    {
      "event_code": "U16O",
      "event_name": "Online National Under 16 Open Chess Championship 2021"
    },
    {
      "event_code": "U16G",
      "event_name": "Online National Under 16 Girls Chess Championship 2021"
    },
    {
      "event_code": "U14O",
      "event_name": "Online National Under 14 Open Chess Championship 2021"
    },
    {
      "event_code": "U14G",
      "event_name": "Online National Under 14 Girls Chess Championship 2021"
    },
    {
      "event_code": "U12O",
      "event_name": "Online National Under 12 Open Chess Championship 2021"
    },
    {
      "event_code": "U12G",
      "event_name": "Online National Under 12 Girls Chess Championship 2021"
    },
    {
      "event_code": "U10O",
      "event_name": "Online National Under 10 Open Chess Championship 2021"
    },
    {
      "event_code": "U10G",
      "event_name": "Online National Under 10 Girls Chess Championship 2021"
    },
    {
      "event_code": "U07O",
      "event_name": "Online National School Under 7 Open Chess Championship 2021"
    },
    {
      "event_code": "U07G",
      "event_name": "Online National School Under 7 Girls Chess Championship 2021"
    },
    {
      "event_code": "U09O",
      "event_name": "Online National School Under 9 Open Chess Championship 2021"
    },
    {
      "event_code": "U11G",
      "event_name": "Online National School Under 11 Girls Chess Championship 2021"
    },
    {
      "event_code": "U13G",
      "event_name": "Online National School Under 13 Girls Chess Championship 2021"
    },
    {
      "event_code": "U15G",
      "event_name": "Online National School Under 15 Girls Chess Championship 2021"
    },
    {
      "event_code": "U17G",
      "event_name": "Online National School Under 17 Girls Chess Championship 2021"
    },
    {
      "event_code": "SeniorWomen",
      "event_name": "Online National Senior Women Girls Chess Championship 2021"
    },
    {
      "event_code": "JuniorGirls",
      "event_name": "Online National Junior Girls Chess Championship 2021"
    },
    {
      "event_code": "U17O",
      "event_name": "Online National School Under 17 Open Chess Championship 2021"
    },
    {
      "event_code": "U15O",
      "event_name": "Online National School Under 15 Open Chess Championship 2021"
    },
    {
      "event_code": "U13O",
      "event_name": "Online National School Under 13 Open Chess Championship 2021"
    },
    {
      "event_code": "U11O",
      "event_name": "Online National School Under 11 Open Chess Championship 2021"
    },
    {
      "event_code": "U09G",
      "event_name": "Online National School Under 9 Girls Chess Championship 2021"
    }
];

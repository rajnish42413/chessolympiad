import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, message, Typography } from 'antd';
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

  const handlePlayerAICFID = async (value: string) => {
    if (!value) return;
    try {
      setSearchloading(true);
      const { data } = await Axios.post(`send-otp`, { aicf_id: value });
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

  return (
    <>
      <Row gutter={[30, 20]}>
        <Col xs={24} sm={24} md={8} lg={12} xl={12}>
          <Form.Item
            name="aicf_id"
            label="Enter AICF ID"
            rules={[{ required: true, message: 'Please input your aicf_id!' }]}
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
          <Typography.Paragraph>
            ** If certificate not downloaded or failded to open ,{props.dLink} open this link in new
            tab
          </Typography.Paragraph>
        </>
      )}
    </>
  );
}

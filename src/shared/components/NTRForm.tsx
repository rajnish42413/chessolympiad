import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Radio, Upload, message, Checkbox, notification } from 'antd';
import Loader from './loader/Loader';
import { IEvent } from '../../schemas/IEvent';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { IPlayerDetail } from '../../schemas/IContact';
import PlayerDetailCard from './PlayerDetailCard';
import { PlayerName } from '@utils/helpers';
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from '@constants/general';
import LocationAutoComplete from './LocationAutoComplete';

interface IProps {
  btnLoading: boolean;
  events: Array<IEvent>;
  setPlayerId: any,
  setBirthCertificate: any;
}

export default function NTRFormItems(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState({} as IPlayerDetail);
  const { player, photo, location, birth_certificate } = playerData;
  const [searchloading, setSearchloading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as IEvent);

  const { events, setPlayerId, setBirthCertificate } = props;

  const handlePlayerAICFID = async (value: string, event: any) => {
    if (!value) return;
    setSearchloading(true);
    const { data } = await Axios.get(`aicfid/${value}`);
    console.log(data?.membership_expired);
    console.log(data?.order_status);
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
  const handleSelectEvent = (value: string) => {
    if (!value) return;
    const event = events.find(e => e.id === +value);
    if (event) setSelectedEvent(event);
  }


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

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Row gutter={[30, 20]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item
            name="event"
            label="Choose a Tournament to apply for"
            rules={[{ required: true, message: 'Click here to select' }]}
          >
            <Select placeholder="select event" onChange={handleSelectEvent}>
              {events?.map(e => <Select.Option value={e.id} key={e.id}>{e.name}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>

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

      {player && <Row style={{ marginTop: '15px' }}>
        <Col span={24}>
          <PlayerDetailCard
            player={player}
            title={PlayerName(player?.first_name, player?.middle_name, player?.last_name)}
            location={location}
            photo={photo}
          />
        </Col>
      </Row>}


    {selectedEvent && <Row gutter={[30, 20]} style={{ marginTop: '1rem' }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item
            name="event_fee_id"
            label="Select registration type"
            rules={[{ required: true, message: 'Please select event!' }]}
          >
            <Radio.Group>
              {selectedEvent?.fees?.map(e =>
                <Radio value={e.id}>{e.name} (INR {e.amount})</Radio>
              )}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>}

      {selectedEvent.allow_optional_email === 1 && <Row gutter={[30, 20]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item
            name="optional_email"
            label="Optional Email"
            rules={[
              { required: true, message: 'Please input your optional email!' },
              { type: 'email', message: 'Please enter valid optional email' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>
      }

      {selectedEvent.allow_dob_certificate === 1 && <Row >
        <Col xs={24} style={{marginTop:'10px'}}>
          <Upload {...IBirtCertificateProps} multiple={false}>
            <Button type="default" icon={<UploadOutlined />}>
              Birth Certificate
            </Button>
          </Upload>
          <p style={{ marginTop: 20 }}>(PDF, JPEG, JPG, PNG documents only. Maximum size 1000 KB) (Optional)</p>
        </Col>
      </Row>}

      {(player && !location?.state_name) &&
        <Row gutter={[30, 20]}>
          <LocationAutoComplete />
        </Row>
      }

      {/* <Row gutter={[30, 20]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item
            name="is_north_eastern_state_player"
            label=""
            valuePropName="checked"
          >
            <Checkbox >I am a North Eastern State Player</Checkbox>
          </Form.Item>
        </Col>
      </Row> */}

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
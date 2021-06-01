import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, Radio, Upload, message } from 'antd';
import moment from 'moment';
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
  setBirthCertificate:any;
}

export default function NTRFormItems(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState({} as IPlayerDetail);
  const { player, photo, location , birth_certificate} = playerData;
  const [searchloading, setSearchloading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as IEvent);

  const { events, setPlayerId, setBirthCertificate} = props;

  const handlePlayerAICFID = async (value: string, event: any) => {
    if (!value) return;
    const { data } = await Axios.get(`aicfid/${value}`);
    setPlayerData(data);
    setPlayerId(data?.player?.id);
  }

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
        const {response} =  info?.file;
        const image = response?.image;
        if(image && image?.entity === "contact_passport_birth_certificate"){
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
        <Col span={24}>
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
        <Col span={9}>
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


      {selectedEvent && <Row gutter={[30, 20]}>
        <Col span={24}>
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

      {(player && !birth_certificate) && <Row >
        <Col xs={24}>
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
         <LocationAutoComplete  />
       </Row>
      }

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
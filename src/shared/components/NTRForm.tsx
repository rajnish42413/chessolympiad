import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, DatePicker, Radio } from 'antd';
import moment from 'moment';
import Loader from './loader/Loader';
import { IEvent } from '../../schemas/IEvent';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { IPlayerDetail } from '../../schemas/IContact';
import PlayerDetailCard from './PlayerDetailCard';
import { PlayerName } from '@utils/helpers';

interface IProps {
  btnLoading: boolean;
  events: Array<IEvent>;
  setPlayerId:any
}

export default function NTRFormItems(props: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState({} as IPlayerDetail);
  const { player, photo, location} = playerData;
  const [searchloading, setSearchloading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as IEvent);

  const { events ,setPlayerId} = props;

  const handlePlayerAICFID = async (value: string, event: any) => {
    if (!value) return;
    const { data } = await Axios.get(`aicfid/${value}`);
    setPlayerData(data);
    setPlayerId(data?.player?.id);
  }

  const handleSelectEvent = (value:string) =>{
   if(!value) return;
   const event = events.find(e => e.id === +value);
   if(event) setSelectedEvent(event);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Form.Item
            name="event"
            label="Select Event"
            rules={[{ required: true, message: 'Please select event!' }]}
          >
            <Select placeholder="select event" onChange={handleSelectEvent}>
              {events?.map(e => <Select.Option value={e.id} key={e.id}>{e.name}</Select.Option>)}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Form.Item
            name="aicf_id"
            label="Enter AICF ID"
            rules={[
              { required: true, message: 'Please input your aicf_id!' },
            ]}
          >
            <Input.Search placeholder="input search text" enterButton="Search" onSearch={handlePlayerAICFID} loading={searchloading} />
          </Form.Item>
          <p>** (If you don't remember your AICF ID, please search <Link to="/players">here</Link>) **</p>
        </Col>
      </Row>

      {player && <Row style={{marginTop:'15px'}}>
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
               <Radio value={e.id}>{e.name} (IRN {e.amount})</Radio>  
              )}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>}

      <Row style={{ marginTop: '30px' }}>
        <Col>
          <Button type="primary" size="large" htmlType="submit" disabled={!player}>
            Submit Form
          </Button>
        </Col>
      </Row>
    </>
  );
}
import React, { useState } from 'react';
import {
  Form,
  Select,
  Row,
  Col,
  Button,
  Space,
  Table, message, Input, Divider, Typography
} from 'antd';
import Loader from './loader/Loader';
import { IFederation } from '../../schemas/IFederation.d';
import TeamPreview from './TeamPreview';
import AddPlayerInTeam from './AddPlayerInTeam';
import { useHistory } from 'react-router-dom';
import { MAX_PLAYER_ALLOW } from '../../constants/general';
import axios from 'axios';

interface IProps {
  federations: Array<IFederation>;
}

interface IPlayer {
  id: String;
  name: any;
  fide_id: any;
  gender: any;
  rating: any;
  rank: any;
  player_type: any;
  o_action?: any;
}

export default function RegisterFormItems(props: IProps) {
  const { federations } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFedration, setSelectedFedration] = useState(0);
  const [teamPlayers, setTeamPlayers] = useState([] as Array<IPlayer>);
  const history = useHistory();

  const handleSelectEvent = (value: string) => {
    if (!value) return;
    setSelectedFedration(+value);
  }

  const onFinish = () => {
    if(teamPlayers.length < 2){
      message.error("Please add players on you team");
      return;
    }
    const data = {
      federation_id : selectedFedration,
      players: teamPlayers
    };
    handleSubmitForm(data);
  };

  const handleSubmitForm = async (values: any) => {
    const {data} = await axios.post(`teams`, values);
    if(data){
      history.push('/upload-documents', data);
    }
    return;
  };

  const addPlayer = (player: IPlayer) => {
    if(teamPlayers.length >= MAX_PLAYER_ALLOW){
      message.error("Maximum Player in Team not exceeded than"+MAX_PLAYER_ALLOW);
      return;
    }
    const data = {
      ...player,
      id: "id" + Math.random().toString(16).slice(2)
    }
    setTeamPlayers([...teamPlayers, ...[data]]);
  };

  const removePlayer = (id: String | undefined) => {
    if (!id) return;
    const newTeam = teamPlayers.filter(item => item.id !== id);
    setTeamPlayers(newTeam);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Row style={{ marginTop: 20 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} key={1}>
          <Select placeholder="select federation" onChange={handleSelectEvent} style={{width:'100%'}}>
            {federations?.map(e => <Select.Option value={e.id} key={e.id}>{e.name}</Select.Option>)}
          </Select>
        </Col>
      </Row>

      {selectedFedration ? 
      <div>
          <Divider />
          <Typography.Title level={4}>Team Players</Typography.Title>
          <TeamPreview
            team={teamPlayers}
            removePlayer={removePlayer}
          />
          {teamPlayers.length <= MAX_PLAYER_ALLOW && <AddPlayerInTeam addPlayer={addPlayer} />}
      </div> : <div />}

      <Button type="primary" size="large" onClick={onFinish} style={{margin:"20px 0"}}>
        Save Team
      </Button>
    </div>
  );
}

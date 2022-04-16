import React, { useState } from 'react';
import { Button, message, Divider, Typography, Alert } from 'antd';
import Loader from './loader/Loader';
import { IFederation } from '../../schemas/IFederation.d';
import TeamPreview from './TeamPreview';
import AddPlayerInTeam from './AddPlayerInTeam';
import { useHistory } from 'react-router-dom';
import { MAX_PLAYER_ALLOW } from '../../constants/general';
import axios from 'axios';
import { useEffect } from 'hoist-non-react-statics/node_modules/@types/react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFedration, setSelectedFedration] = useState(0);
  const [teamPlayers, setTeamPlayers] = useState([] as Array<IPlayer>);
  const history = useHistory();
  const [save, setSave] = useState(false);
  const [Data, setdata] = useState<any>(null);

  // const handleSelectEvent = (value: string) => {
  //   if (!value) return;
  //   setSelectedFedration(+value);
  // };

  const onFinish = () => {
    if (teamPlayers.length < 2) {
      message.error('Please add players on you team');
      return;
    }
    let newTeamPlayers: any = [];
    teamPlayers.map((tp: any) => {
      let i = tp;
      i.type_id = 1;
      newTeamPlayers.push(i);
    });
    const data = {
      federation_id: 1,
      players: newTeamPlayers
    };
    setSave(true);
    setdata(data);
  };

  const handleSubmitForm = async () => {
    const { data } = await axios.post(`teams`, Data);
    if (data) {
      history.push(`/teams/${data.team.id}/upload-documents`, data);
    }
    return;
  };

  const addPlayer = (player: IPlayer) => {
    setSave(false);
    if (teamPlayers.length >= MAX_PLAYER_ALLOW) {
      message.error('Maximum Player in Team not exceeded than' + MAX_PLAYER_ALLOW);
      return;
    }
    const data = {
      ...player,
      id:
        'id' +
        Math.random()
          .toString(16)
          .slice(2)
    };
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
      <div>
        <Divider />
        <Typography.Title level={4}>Team Players - Add/ Modify</Typography.Title>
        {teamPlayers.length > 0 && (
          <Alert
            message="You have unsaved teammates ,press save button to save "
            type="error"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        )}
        <TeamPreview team={teamPlayers} removePlayer={removePlayer} />
        {teamPlayers.length <= MAX_PLAYER_ALLOW && <AddPlayerInTeam addPlayer={addPlayer} />}
      </div>{' '}
      : <div />
      {save ? (
        <Button
          key="save"
          type="primary"
          size="large"
          onClick={handleSubmitForm}
          style={{ margin: '20px 0' }}
        >
          Proceed
        </Button>
      ) : (
        <Button
          key="proceed"
          type="primary"
          size="large"
          onClick={onFinish}
          style={{ margin: '20px 0' }}
        >
          Save
        </Button>
      )}
    </div>
  );
}

import TeamPlayerPreview from '@components/team/reviewPlayers';
import AppLayout from '@layout/app';
import { Descriptions, Divider, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ITeam } from 'src/schemas/ITeam';

export default function TeamView() {
  const [team, setTeam] = useState({} as ITeam);
  let { id }: any = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios(`teams/${id}`);
    setTeam(data);
  };

  return (
    <AppLayout>
      <Descriptions title="United States">
        <Descriptions.Item label="Total Players">{team.players?.length}</Descriptions.Item>
        <Descriptions.Item label="Registration Type">Open Section</Descriptions.Item>
        <Descriptions.Item label="Submitted At">
          {moment(team.created_at).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag>Submitted</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Message">
          Your application is submitted and Under review!
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <TeamPlayerPreview players={team.players}/>
    </AppLayout>
  );
}

import Loader from '@components/loader/Loader';
import TeamDetailDrawer from '@components/TeamDetail';
import AppLayout from '@layout/app';
import { Space, Table, Tag, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ITeam } from '../../schemas/ITeam';

export default function Teams() {
  const [teams, setTeams] = useState([] as Array<ITeam>);
  const [selectedTeam, setSelectedTeam] = useState({} as ITeam);
  const [visible, setVisible] = useState(false);

  const getData = async () => {
    const { data } = await axios(`teams`);
    setTeams(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectTeam = (team: ITeam) => {
    setSelectedTeam(team);
    setVisible(true);
  };

  const columns = [
    {
      title: 'Application Type',
      dataIndex: 'type_id',
      key: 'type_id',
      render: (text: any) => types_arr[Math.floor(Math.random() * types_arr.length)]
    },
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: any, record: ITeam) => (
        <Space size="middle">
          <Link to={`teams/${record.id}`}>
            <Button type="link">#OLY2022-{text}</Button>
          </Link>
        </Space>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created: any) => moment(created).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'Federation',
      dataIndex: 'federation_id',
      key: 'federation_id',
      render: (tags: any) => `United States`
    },
    {
      title: 'Status',
      dataIndex: 'updated_at',
      key: 'enabled',
      render: (enabled: any) => <Tag>Submitted</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: ITeam) => (
        <Space size="middle">
          <Link to={`teams/${record.id}`}>
            <Button>View</Button>
          </Link>
        </Space>
      )
    }
  ];

  return (
    <AppLayout>
      <Link to="teams/register">
        <Button type="primary" style={{ marginBottom: 20 }}>
          Add Team
        </Button>
      </Link>
      {teams.length ? <Table columns={columns} dataSource={teams} /> : <Loader />}
      <TeamDetailDrawer team={selectedTeam} visible={visible} setVisible={setVisible} />
    </AppLayout>
  );
}

const types_arr = [
  'Open Section',
  'Women Section',
  'General Assembly',
  'Visitors',
  'Federation Officials',
  'Congress Meetings'
];

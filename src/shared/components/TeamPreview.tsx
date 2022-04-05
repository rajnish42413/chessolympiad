import React from 'react';
import { Button, Space, Table } from 'antd';

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

interface IProps {
  team: Array<IPlayer>;
  removePlayer: any;
}
export default function TeamPreview({ team, removePlayer }: IProps) {
  const handleRemovePlayer = (id: String | undefined) => {
    if (!id) return;
    removePlayer(id);
  };

  const columns = [
    {
      title: 'Fide ID',
      dataIndex: 'fide_id',
      key: 'fide_id'
    },
    {
      title: 'Player Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Player Type',
      dataIndex: 'type_id',
      key: 'type_id'
    },
    {
      title: 'Gender',
      key: 'gender',
      dataIndex: 'gender'
    },
    {
      title: 'Rating',
      key: 'rating',
      dataIndex: 'rating'
    },
    {
      title: 'Board No.',
      key: 'rank',
      dataIndex: 'rank'
    },
    {
      title: 'Action',
      key: 'action',
      render: (player: IPlayer) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleRemovePlayer(player.id)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return <Table columns={columns} dataSource={team} pagination={false} />;
}

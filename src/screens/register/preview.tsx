import { CheckOutlined } from '@ant-design/icons';
import AppLayout from '@layout/app';
import { Button, Checkbox, Descriptions, Divider, PageHeader, Space, Table, Typography } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ITeam, ITeamPlayer } from '../../schemas/ITeam';

interface ILState{
    team:ITeam;
    players:Array<ITeamPlayer>
}

export default function PreviewReg() {
  const { state }:any = useLocation();
  const {team, players} =  state;
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
    }
  ];

  const docColumns = [
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
      title: 'Photo',
      key: 'photo',
      render: (t:any) => <strong><CheckOutlined style={{color:'green'}}/></strong>
    },
    {
      title: 'Passport',
      key: 'passport',
      render: (t:any) => <strong><CheckOutlined style={{color:'green'}}/></strong>
    },
    {
        title: 'Travel',
        key: 'travel',
        render: (t:any) => <strong><CheckOutlined style={{color:'green'}}/></strong>
    },
    {
        title: 'RT-PCR',
        key: 'pcr',
        render: (t:any) => <strong><CheckOutlined style={{color:'green'}}/></strong>
    },
    {
        title: 'VISA',
        key: 'visa',
        render: (t:any) => <strong><CheckOutlined style={{color:'green'}}/></strong>
    },
    {
        title: 'Vaccine',
        key: 'vaccine',
        render: (t:any) => <strong><CheckOutlined style={{color:'green'}}/></strong>
    },
  ];

  return (
    <AppLayout>
        <PageHeader
        style={{ padding: 0, marginBottom: 20 }}
        ghost={false}
        title="Preview Team"
        subTitle=""
        extra={[
          <>
            <Button key="1">Back/Edit</Button>
          </>
        ]}
      >
          <Descriptions size="small" column={3}>
          <Descriptions.Item label="Country">{'India'}</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>All India Chess Federation</a>
          </Descriptions.Item>
          <Descriptions.Item label="Team Type">Open Section</Descriptions.Item>
          <Descriptions.Item label="Total Player">6</Descriptions.Item>
          <Descriptions.Item label="Visa Status">On Arrival</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Table columns={columns} dataSource={state?.players} pagination={false} />
      <Divider />
      <Typography.Title level={4}>Documents Detail</Typography.Title>
      <Table columns={docColumns} dataSource={state?.players} pagination={false} />
      <div style={{marginTop:20}} />
      <Checkbox checked={true}>I Accept all term and conditions.</Checkbox>
      <div style={{marginTop:20}} />
      <Typography.Title level={5}>
          <strong>PAYMENT: </strong>
          {players.length} people * 100 EURO = EURO {players.length * 100}
      </Typography.Title>
      <div style={{marginTop:20}} />
      <Link to="/payment-detail">
          <Button type="primary">
              Submit Application
          </Button>
      </Link>
      <div style={{marginTop:50}} />
    </AppLayout>
  );
}

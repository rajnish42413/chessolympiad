import React, { useEffect, useState } from 'react';
import { Button, Table, message, Input, Upload, Tag, Typography, Divider, Descriptions, PageHeader } from 'antd';
import AppLayout from '@layout/app';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { API_URL } from '../../constants/general';
import axios from 'axios';
import Loader from '@components/loader/Loader';

interface IPlayer {
  id: String;
  name: any;
  fide_id: any;
  photo: any;
  passport: any;
  visa: any;
  other: any;
  issue_at?: any;
}

export default function UploadDocument() {
  const history = useHistory();
  const { state }: any = useLocation();
  const players = state?.players;
  const [team, setTeam] = useState({})
  const [teamDocuments, setTeamDocuments] = useState([]);
  let { id }: any = useParams();
  const [loading, setLoading] = useState(false);
  const [totalRequiredDocs, setTotalRequiredDocs] = useState(0);
  const [totalUploadedDocs, setTotalUploadedDocs] = useState(0);

  useEffect(() => {
    getPlayers()
  }, [])


  const getPlayers = async () => {
    const { data } = await axios.get(`teams/${id}`);
    const players = data.players;
    const team = data.team;
    let newData: any = [];
    players.map((p: any) => {
      newData.push({ ...p, photo: "", passport: "", visa: "", other: "", issue_at: "", });
    });
    setTotalRequiredDocs(newData.length * 3)
    setTeam(team);
    setTeamDocuments(newData);
    setLoading(false);
  }

  if (!players) {
    history.goBack();
  }

  const onFinish = (values: any) => {
    const data = {
      ...values
    };
    handleSubmitForm(data);
  };

  const handleSubmitForm = async (values: JSON) => {
    console.log(values);
    return;
  };

  const IPhotoProps = {
    name: 'file',
    action: `${API_URL}teams/${id}/upload`,
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setTotalUploadedDocs(+totalUploadedDocs + 1);
      } else if (info.file.status === 'error') {
        console.log(info.file)
        message.error(`${info.file.name} file upload failed.`);
      }
    }
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
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (p: IPlayer) =>
        p.photo ? (
          <img src={p.photo} alt={p.name} />
        ) : (
          <Upload {...IPhotoProps} data={{ type: "photo" }}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        )
    },
    {
      title: 'Passport',
      dataIndex: 'passport',
      key: 'passport',
      render: (p: IPlayer) =>
        p.passport ? (
          <img src={p.passport} alt={p.name} />
        ) : (
          <Upload {...IPhotoProps} data={{ type: "passport" }}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        )
    },
    {
      title: 'Visa',
      dataIndex: 'visa',
      key: 'visa',
      render: (p: IPlayer) =>
        p.visa ? (
          <img src={p.visa} alt={p.name} />
        ) : (
          <Upload {...IPhotoProps} data={{ type: "visa" }}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        )
    },
    {
      title: 'Passport Issu At',
      dataIndex: 'issue_at',
      key: 'issue_at',
      render: (p: IPlayer) => (p.issue_at ? <Tag>{p.issue_at}</Tag> : <Input />)
    }
  ];

  return (
    <AppLayout>
       <PageHeader
        style={{ padding: 0 }}
        ghost={false}
        onBack={() => window.history.back()}
        title="Open Section"
        subTitle="Team Registration"
        extra={[]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="App ID">#OLY2022-0231</Descriptions.Item>
          <Descriptions.Item label="Creation Time">2022-04-03</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Divider />
      {loading ? <Loader /> :
        <div style={{ marginTop: 20 }}>
          <Typography.Title level={3}>Upload Documents</Typography.Title>
          <Table
            columns={columns}
            dataSource={teamDocuments}
            pagination={false}
            loading={!teamDocuments}
          />
          <Divider />
          <Button type="primary" onClick={() => history.push('/payment-detail')}>
            Save Documents
          </Button>
          <Divider />
          {(totalRequiredDocs  > 0) &&<Typography.Paragraph style={{color:'red'}}>
            ** Required {totalRequiredDocs} Documnets. **
          </Typography.Paragraph>}
        </div>}
    </AppLayout>
  );
}

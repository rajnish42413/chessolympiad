import React, { useEffect, useState } from 'react';
import { Button, Table, Tabs, message, Col, Upload, Tag, Typography, Divider, Descriptions, PageHeader, Card, Row, Space } from 'antd';
import AppLayout from '@layout/app';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { API_URL } from '../../constants/general';
import axios from 'axios';
import { ITeam, ITeamPlayer } from '../../schemas/ITeam';
import HealthDetail from '@components/Health';
import TravelDetail from '@components/travel';
import PersonalDetail from '@components/personal';
const { TabPane } = Tabs;

export default function UploadDocument() {
  const history = useHistory();
  const { state }:any = useLocation();
  console.log(state,"state")

  const [team, setTeam] = useState({} as ITeam)
  const [teamPlayers, setTeamPlayers] = useState([] as Array<ITeamPlayer>);
  let  {id} : any = useParams();
  const [loading, setLoading] = useState(false);
  const [totalRequiredDocs, setTotalRequiredDocs] = useState(0);
  const [totalUploadedDocs, setTotalUploadedDocs] = useState(0);

  useEffect(() => {
    if(id){
      console.log(id)

      getPlayers()
    }
  }, [])


  const getPlayers = async () => {
    const { data } = await axios.get(`teams/${id}`);
    const players = data.players;
    const team = data.team;
    setTeam(team);
    setTeamPlayers(players);
    setLoading(false);
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
        const total = totalUploadedDocs + 1;
        setTotalUploadedDocs(total);
      } else if (info.file.status === 'error') {
        console.log(info.file)
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  // const columns = [
  //   {
  //     title: 'Fide ID',
  //     dataIndex: 'fide_id',
  //     key: 'fide_id'
  //   },
  //   {
  //     title: 'Player Name',
  //     dataIndex: 'name',
  //     key: 'name'
  //   },
  //   {
  //     title: 'Photo',
  //     dataIndex: 'photo',
  //     key: 'photo',
  //     render: (text:any, p: IPlayer) =>
  //       p.photo ? (
  //         <img src={p.photo} alt={p.name} />
  //       ) : (
  //         <Upload {...IPhotoProps} data={{ type: "photo", player_id : p.id}}>
  //           <Button icon={<UploadOutlined />}>Click to Upload</Button>
  //         </Upload>
  //       )
  //   },
  //   {
  //     title: 'Passport',
  //     dataIndex: 'passport',
  //     key: 'passport',
  //     render: (text: any, p:any) =>
  //       p.passport ? (
  //         <img src={p.passport} alt={p.name} />
  //       ) : (
  //         <Upload {...IPhotoProps} data={{ type: "passport", player_id : p.id}}>
  //           <Button icon={<UploadOutlined />}>Click to Upload</Button>
  //         </Upload>
  //       )
  //   },
  //   {
  //     title: 'Visa',
  //     dataIndex: 'visa',
  //     key: 'visa',
  //     render: (text: any, p:any) =>
  //       p.visa ? (
  //         <img src={p.visa} alt={p.name} />
  //       ) : (
  //         <Upload {...IPhotoProps} data={{ type: "visa", player_id: p.id }}>
  //           <Button icon={<UploadOutlined />}>Click to Upload</Button>
  //         </Upload>
  //       )
  //   },
  //   {
  //     title: 'Passport Issu At',
  //     dataIndex: 'issue_at',
  //     key: 'issue_at',
  //     render: (issue_at:any) => (issue_at ? <Tag>{issue_at}</Tag> : <Input />)
  //   }
  // ];

  const handleNextPage = () =>{
    history.push(`/team-preview`,{players:teamPlayers, team:team})
  }

  return (
    <AppLayout>
      <PageHeader
        style={{ padding: 0 }}
        ghost={false}
        onBack={() => window.history.back()}
        title={state?.type?.name}
        subTitle={"Registration"}
        extra={[]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="App ID">#OLY2022-0231</Descriptions.Item>
          <Descriptions.Item label="Creation Time">2022-04-03</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Divider />
      {/* {loading ? <Loader /> :
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
        </div>} */}
        {!id?
        <>
          <PersonalDetail/>
          <Divider/>
          <Typography>
              <Typography.Title level={4}> Documents</Typography.Title>
            </Typography>
            <Card title="IDENTITY DOCUMENTS">
              <Row>
                <Col span={6}>
                  <Typography.Paragraph>Passport Back</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "passport-front" }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
                <Col span={6}>
                  <Typography.Paragraph>Passport Front</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "passport-back" }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
                <Col span={6}>
                  <Typography.Paragraph>Photo</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "photo" }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
                <Col span={6}>
                  <Typography.Paragraph>Visa Photo</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "visa" }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
              </Row>
            </Card>
            <HealthDetail />
            <TravelDetail />
            <PersonalDetail />
              <Button size="large" type="primary" style={{width:'10vw', margin: 20}} onClick={handleNextPage}>Next</Button>
        </>:
      <Tabs defaultActiveKey="1" tabPosition="left">
        {teamPlayers?.map(p => (
          <TabPane tab={`${p.name}`} key={p.id} >
            <Typography>
              <Typography.Title level={4}>{p.name} Documents</Typography.Title>
            </Typography>
            <Card title="IDENTITY DOCUMENTS">
              <Row>
                <Col span={6}>
                  <Typography.Paragraph>Passport Back</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "passport-front", player_id: p.id }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
                <Col span={6}>
                  <Typography.Paragraph>Passport Front</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "passport-back", player_id: p.id }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
                <Col span={6}>
                  <Typography.Paragraph>Photo</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "photo", player_id: p.id }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
                <Col span={6}>
                  <Typography.Paragraph>Visa Photo</Typography.Paragraph>
                  <Upload {...IPhotoProps} data={{ type: "visa", player_id: p.id }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
              </Row>
            </Card>
            <HealthDetail />
            <TravelDetail />
            <PersonalDetail />
              <Button size="large" type="primary" style={{width:'10vw', margin: 20}} onClick={handleNextPage}>Next</Button>
          </TabPane>
        ))}
      </Tabs>}
    </AppLayout>
  );
}

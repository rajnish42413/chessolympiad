import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, Col, Descriptions, Modal, Row, Space, Typography } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { IPlayerDetail } from '../../schemas/IContact';
import Loader from '@components/loader/Loader';
import Logo from '../../assets/img/aicf-logo.png';
import {  PlayerName } from '@utils/helpers';
import PlayerDetailCard from '@components/PlayerDetailCard';

export default function ShowPlayer() {
  const { id }: any = useParams();
  const history = useHistory();
  const [isloading, setIsloading] = useState(true);
  const [showIdCard, setShowIdCard] = useState(false);
  const [data, setData] = useState({} as IPlayerDetail);
  const { player, photo , location, membership_expired ,order_status} = data;

  const getData = async () => {
    setIsloading(true);
    try {
      const { data } = await Axios.get(`players/${id}`);
      setData(data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleRenewPayment = (playerId:Number) =>{
    return history.push('/nenew-membership?renew-membership=true' ,{contact_id : playerId});
}

  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Search</Breadcrumb.Item>
        <Breadcrumb.Item>{player?.id}</Breadcrumb.Item>
      </Breadcrumb>
      {isloading ? <Loader /> :
        <div>
          <PlayerDetailCard player={player} title={PlayerName(player?.first_name, player?.middle_name, player?.last_name)} location={location} />
          <Space style={{ margin: '1rem 0' }} size="middle">
            <Button onClick={() => history.goBack()} size="large">Back</Button>
            <Button onClick={() => setShowIdCard(true)} type="primary" size="large">Show ID</Button>

            {(membership_expired === false && order_status === 0) &&
              <Button key="3" type="primary" size="large" onClick={() => handleRenewPayment(player.id)}>Renew Membership</Button>
            }

          </Space>
          <Modal
            width="500px"
            onCancel={() => setShowIdCard(false)}
            visible={showIdCard} onOk={() => setShowIdCard(false)}>
            <Row gutter={16}>
              <Col span={8}>
                <img src={Logo} alt="aicf logo" width="100%" height="auto" />
              </Col>
              <Col span={16}>
                <Typography>
                  <Typography.Title level={5} style={{ color: '#3F51B5' }}>ALL INDIA CHESS FEDERATION </Typography.Title>
                  <p>Affilate of FIDE & Recognized by the Government of India</p>
                  <p>Room No. 70, Jawaharlal Nehru Stadium,<br />
                    Chennai - 600 003,INDIA.<br />
                    Phone: 044 - 65144966 Fax: 044 - 25382121</p>
                </Typography>
              </Col>
            </Row>
            <Row gutter={16} style={{ margin: '1rem 0' }}>
              <Col span={8}>
                {photo && <img src={photo?.original} width="100%" height="auto" alt={`${player?.first_name} profile`} />}
              </Col>
              <Col span={16}>
                <Descriptions column={1}>
                  <Descriptions.Item label="Name">{PlayerName(player.first_name, player.middle_name, player.last_name)}</Descriptions.Item>
                  <Descriptions.Item label="AICF Regn. No.">{player?.aicf_id}</Descriptions.Item>
                  <Descriptions.Item label="State">{location?.state_name}</Descriptions.Item>
                  <Descriptions.Item label="Valid Upto">{(membership_expired === false && order_status === 1) ? "2022-03-31" : "Expired"}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Modal>
        </div>}
    </AppLayout>
  );
}


// 2022-03-31
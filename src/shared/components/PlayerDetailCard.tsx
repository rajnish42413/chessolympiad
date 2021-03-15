import React from 'react';
import {Badge, Descriptions } from 'antd';
import { IContact, IPhoto } from '../../schemas/IContact';
import moment from 'moment';

interface IProps{
  player:IContact;
  title:string;
  photo?:IPhoto
}
export default function PlayerDetailCard({player, title, photo}:IProps) {

  return (
    <Descriptions title={title} bordered={true}>
    {photo?.original && <Descriptions.Item label="Passport Photo" >
      <img src={photo?.original} width="100px" height="auto" alt="profile" />
    </Descriptions.Item>}
    <Descriptions.Item label="Name">
      {player?.first_name + " " } 
      {player?.middle_name && player?.middle_name} 
      {" " + player?.last_name}
    </Descriptions.Item>


    <Descriptions.Item label="Email">{player?.email}</Descriptions.Item>
    <Descriptions.Item label="Mobile No" span={2}>
      {player?.mobile}
    </Descriptions.Item>

    <Descriptions.Item label="Son/Daughter of" >{player?.son_daughter_of}</Descriptions.Item>
    <Descriptions.Item label="Relationship">{player?.relationship}</Descriptions.Item>
    <Descriptions.Item label="Mother Tounge">{player?.mother_tounge}</Descriptions.Item>

    <Descriptions.Item label="Gender" span={1}>
      <Badge status="processing" text={player?.gender} />
    </Descriptions.Item>
    <Descriptions.Item label="Date of Birth" span={2}>
      {player?.date_of_birth ? moment(player.date_of_birth).format('DD-MM-YYYY') : null}
    </Descriptions.Item>

    <Descriptions.Item label="Address" span={1}>{player?.address}</Descriptions.Item>
    <Descriptions.Item label="Location" span={2}>
      City: <b>{player?.city}</b>
      <br />
      District: <b>{player?.district}</b>
      <br />
      State: <b>{player?.state}</b>
      <br />
    </Descriptions.Item>

    <Descriptions.Item label="Registration Type" span={1}>
      <Badge status="processing" text={player?.player_type} />
    </Descriptions.Item>
    <Descriptions.Item label="Are you a PIO/OCI">{player?.poi}</Descriptions.Item>
    <Descriptions.Item label="FIDE ID">{player?.fide_id}</Descriptions.Item>
  </Descriptions>
  );
}

import React from 'react';
import {Badge, Descriptions } from 'antd';
import { IContact, IPhoto } from '../../schemas/IContact';
import { ILocation } from '../../schemas/ILocation.d';

interface IProps{
  player:IContact;
  title:string;
  photo?:IPhoto |undefined;
  location?:ILocation;
}
export default function PlayerDetailCard({player, title, photo, location}:IProps) {

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
      {player?.date_of_birth}
    </Descriptions.Item>

    <Descriptions.Item label="Address" span={1}>{player?.address}</Descriptions.Item>
    <Descriptions.Item label="Location" span={2}>
      {location ? <> 
      City: <b>{location?.city_name}</b>
      <br />
      District: <b>{location?.district_name}</b>
      <br />
      State: <b>{location?.state_name}</b>
      <br />
       </> :  null}
    </Descriptions.Item>

    <Descriptions.Item label="Registration Type" span={1}>
      <Badge status="processing" text={player?.player_type} />
    </Descriptions.Item>
    <Descriptions.Item label="Are you a PIO/OCI">{player?.poi ? "Yes" : "No"}</Descriptions.Item>
    <Descriptions.Item label="FIDE ID">{player?.fide_id}</Descriptions.Item>
    <Descriptions.Item label="AICF ID">
      {player?.aicf_id }
    </Descriptions.Item>
  </Descriptions>
  );
}

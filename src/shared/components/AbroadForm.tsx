import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button, notification } from 'antd';
import Loader from './loader/Loader';
import { IEvent } from '../../schemas/IEvent';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { IPlayerDetail } from '../../schemas/IContact';
import PlayerDetailCard from './PlayerDetailCard';
import { PlayerName } from '@utils/helpers';

interface IProps {
    btnLoading: boolean;
    events: Array<IEvent>;
    setPlayerId: any,
    setBirthCertificate: any;
}

export default function AbroadForm(props: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [playerData, setPlayerData] = useState({} as IPlayerDetail);
    const { player, photo, location } = playerData;
    const [searchloading, setSearchloading] = useState(false);

    const { setPlayerId } = props;

    const handlePlayerAICFID = async (value: string, event: any) => {
        if (!value) return;
        setSearchloading(true);
        const { data } = await Axios.get(`aicfid/${value}`);
        if ((data?.membership_expired === false && data?.order_status === 1)) {
            setPlayerData(data);
            setPlayerId(data?.player?.id);
            setSearchloading(false);
        } else {
            openNotificationWithIcon();
            setSearchloading(false);
            return;
        }
    }

    const openNotificationWithIcon = () => {
        notification.error({
            message: 'Not AICF Active Member!',
            duration: 10,
            description:
                <> <p>Your membership is expired or not activated!, Please renew your membership to proceed futher.</p></>
        });
    };

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <Row gutter={[30, 20]}>
                <Col xs={24} sm={24} md={8} lg={12} xl={12}>
                    <Form.Item
                        name="aicf_id"
                        label="Enter AICF ID"
                        rules={[
                            { required: true, message: 'Please input your aicf_id!' },
                        ]}
                    >
                        <Input.Search placeholder="AICF ID like: 24232DEL2021" enterButton="Fetch Details" onSearch={handlePlayerAICFID} loading={searchloading} />
                    </Form.Item>
                    <p>** (If you don't remember your AICF ID, please search <Link to="/players">here</Link>) **</p>
                </Col>
            </Row>

            {player && <Row style={{ marginTop: '15px' }}>
                <Col span={24}>
                    <PlayerDetailCard
                        player={player}
                        title={PlayerName(player?.first_name, player?.middle_name, player?.last_name)}
                        location={location}
                        photo={photo}
                    />
                </Col>
            </Row>}


            {player && <Row gutter={[30, 20]} style={{ marginTop: '15px' }}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter valid email' }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="mobile"
                        label="Mobile Number"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { max: 10, min: 10, message: 'Please enter valid phone number!' }
                        ]}
                    >
                        <Input type="number" placeholder="Mobile number" />
                    </Form.Item>
                </Col>
            </Row>}

            {player && <Row gutter={[30, 20]}>

                <Col span={12}>
                    <Form.Item
                        name="fide_id"
                        label="FIDE ID"
                        initialValue={player.fide_id}
                    >
                        <Input placeholder="FIDE ID" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="category"
                        label="Select Category Playing "
                        rules={[{ required: true, message: 'Select Category Playing ' }]}
                    >
                        <Select options={categories} placeholder="Select Category Playing " />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="position"
                        label="Select position"
                        rules={[{ required: true, message: 'Select position' }]}
                    >
                        <Select options={positions} placeholder="Select position" />
                    </Form.Item>
                </Col>
            </Row>
            }


            <Row style={{ marginTop: '30px' }}>
                <Col>
                    <Button type="primary" size="large" htmlType="submit" disabled={!player}>
                        Proceed to Payment
                    </Button>
                </Col>
            </Row>
        </>
    );
}


const categories = [
    { label: 'Under 10', value: 'Under 10' },
    { label: 'Under 12', value: 'Under 12' },
    { label: 'Uner 14', value: 'Under 14' },
];

const positions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: 'GM', value: 'GM' },
    { label: 'IM', value: 'IM' },
    { label: 'WGM', value: 'WGM' },
    { label: 'WIM', value: 'WIM' },
];
import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Table, Tag, Input, Button, Space, Row, Col, Select, Spin } from 'antd';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { IPlayerData, IPlayer } from '../../schemas/IPlayer';
import { ICity, IIState } from '../../schemas/ILocation';


export default function SearchPlayers() {
    const [players, setPlayers] = useState({} as IPlayerData);
    const [states, setStates] = useState([] as Array<IIState>);
    const [filteredStates, setFilteredStates] = useState([] as Array<IIState>);
    const [cityData, setCityData] = useState([] as Array<ICity>);
    const [cities, setcities] = useState([] as Array<ICity>);
    const [selectedCity, setSelectedCity] = useState(0)

    const [selectedState, setSelectedState] = useState(0);
    const result = players?.data;
    const history = useHistory();
    const [isloading, setIsloading] = useState(true);

    const getData = async () => {
        setIsloading(true);
        try {
            const { data } = await Axios.get(`players`);
            setPlayers(data);
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
        }
    };

    const handleSearch = async (value: any, event: any) => {
        setIsloading(true);
        try {
            const { data } = await Axios.get(`players?name=${value}&state=${selectedState}&city=${selectedCity}`);
            setPlayers(data);
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
        }
    }

    const getStates = async () => {
        const { data } = await Axios(`states`);
        setFilteredStates(data);
        setStates(data);
    };

    const handleSelectState = (value: any) => {
        setSelectedState(value);
        getCities(value);
    };

    const handleSelectCity = (value: any) => {
        setSelectedCity(value);
    };

    const getCities = async (value: any) => {
        if (!value) return;
        const { data } = await Axios(`states/${value}/cities`);
        setcities(data);
        setCityData(data);
    };

    useEffect(() => {
        getStates();
        getData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name'
        },
        {
            title: 'City',
            dataIndex: 'city_name',
            key: 'city_name'
        },
        {
            title: 'State',
            dataIndex: 'state_name',
            key: 'state_name'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text: any) => (<Tag color={(text === "F") ? "pink" : "#ddd"}>{text}</Tag>)
        },
        {
            title: 'Status',
            key: 'membership_expired',
            dataIndex: 'membership_expired',
            render: (text: number) => (
                <Space size="middle">
                    {text ?
                        <Tag >Active</Tag>
                        :
                        <Tag color="red">Not Active</Tag>
                    }

                </Space>
            )
        },
        {
            title: '#',
            key: 'actions',
            render: (record: IPlayer) => (
                <Space size="middle">
                    <Button key="1"><Link to={`/players/${record.id}`}>View</Link></Button>
                    {/* {record?.order_status === 0 &&
                   <Button key="2" onClick={() => handlePayment(record.id)}>Pay Now</Button>
                  } */}
                    {!record?.membership_expired &&
                        <Button key="3" type="primary" onClick={() => handleRenewPayment(record.id)}>Renew Membership</Button>
                    }
                </Space>
            ),
        }
    ];


    const handlePayment = (playerId: Number) => {
        return history.push('new-register?payment=true', { contact_id: playerId });
    }

    const handleRenewPayment = (playerId: Number) => {
        return history.push('/nenew-membership?renew-membership=true', { contact_id: playerId });
    }

    const onSearchState = (keyword: string) => {
        if (!keyword) return;
        const data = states?.filter((element) =>
            element?.state_name?.toLowerCase().includes(keyword.toLowerCase())
        );
        console.log(data);
        setFilteredStates(data);
    };

    const onSearchCity = (keyword: string) => {
        if (!keyword) return;
        const data = cityData?.filter((element) =>
            element?.city_name?.toLowerCase().includes(keyword.toLowerCase())
        );
        setcities(data);
    };


    return (
        <AppLayout>
            <Breadcrumb >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Search Player</Breadcrumb.Item>
            </Breadcrumb>
            <Row align="middle" gutter={16}>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                    <Select size="large" 
                    style={{ width: '100%' }} 
                    onSelect={handleSelectState} 
                    onSearch={onSearchState} value={selectedState ? selectedState : ""}
                    placeholder="Select State"
                    showSearch={true}
                    notFoundContent={!filteredStates ? <Spin size="small" /> : null}
                    filterOption={false}
                    >
                        {filteredStates?.map(s =>
                            <Select.Option value={s.id} key={s.id}>{s.state_name}</Select.Option>
                        )}
                    </Select>
                </Col>
                {cities && <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                    <Select size="large" 
                    style={{ width: '100%' }} 
                    onSelect={handleSelectCity} 
                    onSearch={onSearchCity} 
                    value={selectedCity ? selectedCity : ""}
                    placeholder="Select City"
                    showSearch={true}
                    notFoundContent={!cities ? <Spin size="small" /> : null}
                     filterOption={false}
                    >
                        {cities?.map(s =>
                            <Select.Option value={s.id} key={s.id}>{s.city_name}</Select.Option>
                        )}
                    </Select>
                </Col>}

                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Input.Search placeholder="Search by name, fideId, aicfId or email..." size="large" enterButton="Search" style={{ margin: '1rem 0' }} onSearch={handleSearch} />
                </Col>
            </Row>
            <Table columns={columns} dataSource={result} loading={isloading}
                pagination={{ position: ["bottomLeft"] }}
            />
        </AppLayout>
    );
}



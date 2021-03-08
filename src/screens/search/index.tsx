import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Table, Tag, Input, Button } from 'antd';
import { IPlayers } from '../../schemas/IContact';
import Axios from 'axios';
import { Link } from 'react-router-dom';


export default function SearchPlayers() {
    const [players, setPlayers] = useState({} as IPlayers);
    const result = players?.data;
    const [isloading, setIsloading] = useState(true);

    const getData = async () => {
        setIsloading(true);
        try {
            const { data } = await Axios.get(`players`);
            setPlayers(data);
            console.log(data);
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
        }
    };

    const handleSearch = async(value:any, event:any)=>{
        setIsloading(true);
        try {
            const { data } = await Axios.get(`players?name=${value}`);
            setPlayers(data);
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <AppLayout>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Search</Breadcrumb.Item>
            </Breadcrumb>
            <Input.Search placeholder="input search loading default" size="large" enterButton="Search" style={{ margin: '1rem 0' }} onSearch={handleSearch} />
            <Table columns={columns} dataSource={result} loading={isloading} />
        </AppLayout>
    );
}

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
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state'
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (text: any) => (<Tag color={(text === "F") ? "pink" : "#ddd"}>{text}</Tag>)
    },
    {
        title: '#',
        dataIndex: 'id',
        key: '#',
        render: (id: any) => (<Button type="primary"><Link to={`/players/${id}`}>View</Link></Button>)
    }
];

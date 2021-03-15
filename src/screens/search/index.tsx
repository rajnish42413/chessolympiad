import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Table, Tag, Input, Button, Space } from 'antd';
import { IContact, IPlayers } from '../../schemas/IContact';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';


export default function SearchPlayers() {
    const [players, setPlayers] = useState({} as IPlayers);
    const result = players?.data;
    const history = useHistory();
    const [isloading, setIsloading] = useState(true);

    const getData = async () => {
        setIsloading(true);
        try {
            const { data } = await Axios.get(`players?order_status=1`);
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
            dataIndex: 'city',
            key: 'city'
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
            title: 'Order Status',
            key: 'order_status',
            dataIndex:'order_status',
            render: (text:number) => (
             <Space size="middle">
                  {text === 1 &&
                     <>
                     <Tag color="green">Paid</Tag>
                     <Tag >Active</Tag>
                     </>
                  }
                  {text === 0 &&
                     <Tag color="red">UnPaid</Tag>
                  }
                  {text === 2 &&
                     <Tag color="red">Order not created</Tag>
                  }
             </Space>
           )
        },
        {
            title: '#',
            key: 'actions',
            render: (record:IContact) => (
                <Space size="middle">
                  <Button type="primary" key="1"><Link to={`/players/${record.id}`}>View</Link></Button>
                  {record?.order_status === 0 &&
                  <Button type="primary" key="2" onClick={() => handlePayment(record.id)}>Pay Now</Button>
                  }
                </Space>
              ),
        }
    ];


    const handlePayment = (playerId:Number) =>{
      return history.push('checkout' ,{contact_id : playerId});
    }

    return (
        <AppLayout>
            <Breadcrumb >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Search</Breadcrumb.Item>
            </Breadcrumb>
            <Input.Search placeholder="input search loading default" size="large" enterButton="Search" style={{ margin: '1rem 0' }} onSearch={handleSearch} />
            <Table columns={columns} dataSource={result} loading={isloading} />
        </AppLayout>
    );
}



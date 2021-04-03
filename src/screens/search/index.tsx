import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Table, Tag, Input, Button, Space } from 'antd';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { IPlayerData, IPlayer} from '../../schemas/IPlayer';


export default function SearchPlayers() {
    const [players, setPlayers] = useState({} as IPlayerData);
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
            dataIndex:'membership_expired',
            render: (text:number) => (
             <Space size="middle">
                  {text  ?
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
            render: (record:IPlayer) => (
                <Space size="middle">
                  <Button key="1"><Link to={`/players/${record.id}`}>View</Link></Button>
                  {/* {record?.order_status === 0 &&
                   <Button key="2" onClick={() => handlePayment(record.id)}>Pay Now</Button>
                  } */}
                  {!record?.membership_expired  &&
                   <Button key="3" type="primary" onClick={() => handleRenewPayment(record.id)}>Renew Membership</Button>
                  }
                </Space>
              ),
        }
    ];


    const handlePayment = (playerId:Number) =>{
      return history.push('new-register?payment=true' ,{contact_id : playerId});
    }

    const handleRenewPayment = (playerId:Number) =>{
        return history.push('/nenew-membership?renew-membership=true' ,{contact_id : playerId});
    }

    return (
        <AppLayout>
            <Breadcrumb >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Search Player</Breadcrumb.Item>
            </Breadcrumb>
            <Input.Search placeholder="Search by name, fideId, aicfId or email..." size="large" enterButton="Search" style={{ margin: '1rem 0' }} onSearch={handleSearch} />
            <Table columns={columns} dataSource={result} loading={isloading} 
              pagination={{ position: ["bottomLeft"] }}
             />
        </AppLayout>
    );
}



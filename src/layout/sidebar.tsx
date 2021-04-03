import React from 'react';
import { Menu, Layout } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  DollarCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function AppSidebar() {
  return (
    <Layout.Sider style={{ paddingTop: 30 }}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <a href="https://aicf.in/" target="_blank">
            AICF Home
          </a>
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined />}>
          <Link to="/players">Search Player</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileTextOutlined />}>
          <Link to="/new-register">Register New</Link>
        </Menu.Item>
        {/* <Menu.Item key="4" icon={<DollarCircleOutlined />}>
          Renew Membership
        </Menu.Item> */}

        {/* <Menu.Item key="5" icon={<DollarCircleOutlined />}>
          <Link to="/national-tournament-registration">National Tournament Registration</Link>
        </Menu.Item> */}
      </Menu>
    </Layout.Sider>
  );
}

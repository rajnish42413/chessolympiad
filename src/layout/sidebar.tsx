import React, { useState } from 'react';
import { Menu, Layout, Drawer, Button } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  FileTextOutlined,
  PayCircleFilled,
  MenuOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function AppSidebar() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="prs-sidebar">
        <Layout.Sider style={{ paddingTop: 30 }}>
          <div className="logo" />
          {menu('dark')}
        </Layout.Sider>
      </div>
      <Drawer title="PRS-AICF" placement="left" onClose={() => setVisible(false)} visible={visible}>
        {menu('light')}
      </Drawer>
      <Button type="primary" onClick={() => setVisible(!visible)} className="mobile-navabar-btn">
        <MenuOutlined />
      </Button>
    </>
  );
}

const menu = (theme: 'dark' | 'light') => (
  <Menu theme={theme} mode="inline" defaultSelectedKeys={['2']} className="prs-mobile-menu">
    <Menu.Item key="1" icon={<HomeOutlined />}>
      <a href="https://aicf.in/" target="_blank" rel="noopener noreferrer">
        AICF Home
      </a>
    </Menu.Item>
    <Menu.Item key="2" icon={<SearchOutlined />}>
      <Link to="/players">Search Player</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<FileTextOutlined />}>
      <Link to="/new-register">Register New</Link>
    </Menu.Item>
    <Menu.Item key="4" icon={<PayCircleFilled />}>
      <Link to="/pay">Other Payment</Link>
    </Menu.Item>
    {/* <Menu.Item key="4" icon={<DollarCircleOutlined />}>
          Renew Membership
        </Menu.Item> */}

    {/* <Menu.Item key="5" icon={<DollarCircleOutlined />}>
          <Link to="/national-tournament-registration">National Tournament Registration</Link>
        </Menu.Item> */}
  </Menu>
);

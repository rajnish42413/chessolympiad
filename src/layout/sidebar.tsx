import React, { useState } from 'react';
import { Menu, Layout, Drawer, Button } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  FileTextOutlined,
  PayCircleFilled,
  MenuOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

export default function AppSidebar() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  let intialSelected = ['2'];
  if (location.pathname === '/teams') intialSelected = ['4'];
  const [selectedMenu, setSelectedMenu] = useState(intialSelected);

  const onSelect = ({ key }: any) => {
    setSelectedMenu([key]);
  };

  return (
    <>
      <div className="prs-sidebar">
        <Layout.Sider style={{ paddingTop: 30 }}>
          <div className="logo" />
          {menu('dark', selectedMenu, onSelect)}
        </Layout.Sider>
      </div>
      <Drawer
        title="Chess Olympiad"
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu('light', selectedMenu, onSelect)}
      </Drawer>
      <Button type="primary" onClick={() => setVisible(!visible)} className="mobile-navabar-btn">
        <MenuOutlined />
      </Button>
    </>
  );
}

const menu = (theme: 'dark' | 'light', selectedKey: Array<string>, onSelect: any) => {
  return (
    <Menu
      theme={theme}
      mode="inline"
      defaultSelectedKeys={selectedKey}
      className="prs-mobile-menu"
      onSelect={onSelect}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <a href="Chessolympiad.in" target="_blank" rel="noopener noreferrer">
          Chess Olympiad
        </a>
      </Menu.Item>
      <Menu.Item key="2" icon={<SearchOutlined />}>
        <Link to="/teams/register">Profile</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<FileTextOutlined />}>
        <Link to="/teams">View entries</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<PayCircleFilled />}>
        LogOut
      </Menu.Item>
    </Menu>
  );
};

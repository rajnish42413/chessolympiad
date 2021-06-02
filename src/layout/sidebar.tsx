import React, { useEffect, useState } from 'react';
import { Menu, Layout, Drawer, Button } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  FileTextOutlined,
  PayCircleFilled,
  MenuOutlined
} from '@ant-design/icons';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

export default function AppSidebar() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  let intialSelected = ['2'];
  if (location.pathname === '/players') intialSelected = ['2'];
  if (location.pathname === '/new-register') intialSelected = ['3'];
  if (location.pathname === '/pay') intialSelected = ['4'];
  if (location.pathname === '/entry') intialSelected = ['5'];
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
      <Drawer title="PRS-AICF" placement="left" onClose={() => setVisible(false)} visible={visible}>
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
        <Link to="/pay">Other Payments</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<FileTextOutlined />}>
        <Link to="/entry">Online Entry</Link>
      </Menu.Item>
      {/* <Menu.Item key="4" icon={<DollarCircleOutlined />}>
          Renew Membership
        </Menu.Item> */}

      {/* <Menu.Item key="5" icon={<DollarCircleOutlined />}>
          <Link to="/national-tournament-registration">National Tournament Registration</Link>
        </Menu.Item> */}
    </Menu>
  );
};

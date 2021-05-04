import React from 'react';
import { Layout } from 'antd';
import Headerbanner from '../assets/img/banner-aicf.png';

export default function AppHeader() {
  const style = {
    backgroundImage: `url(${Headerbanner})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };
  return <Layout.Header style={style} />;
}

import React from 'react';

import './Home.less';
import AppLayout from '@layout/app';
import { Typography } from 'antd';

type Props = {};

const Home: React.FC<Props> = () => {
  return (
    <AppLayout>
      <div className="home">
        <Typography>
          <Typography.Title level={3}>Chess Olympiad Registration</Typography.Title>
        </Typography>
      </div>
    </AppLayout>
  );
};

export default Home;

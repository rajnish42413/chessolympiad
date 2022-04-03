import { Button, Drawer } from 'antd';
import React, { useState } from 'react';

export default function AppDrawer() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Drawer placement="right" onClose={onClose} visible={visible}>
      <Button key="1">View entries</Button>
      <Button key="1" type="primary">
        LogOut
      </Button>
    </Drawer>
  );
}

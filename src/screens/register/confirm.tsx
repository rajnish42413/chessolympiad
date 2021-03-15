import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, message, Checkbox, Space } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../../shared/components/loader/Loader';
import PlayerDetailCard from '@components/PlayerDetailCard';


export default function Confirm(props: any) {
  const [btnLoading, setbtnLoading] = useState(false);
  const [termCondition, setTermCondition] = useState(false);
  const history = useHistory();
  const { state } = useLocation();
  const { contact, photo }: any = state;


  const handleSubmitForm = async () => {
    if (!termCondition) return message.warning("Please accept the declaration");
    const show = message.loading('Saving Values ...', 0);
    setbtnLoading(false);
    setTimeout(show, 0);
    history.push('checkout', { contact_id: contact?.id });
  };

  const onChange = (e: any) => {
    if (e?.target?.checked) setTermCondition(e.target.checked);
  }

  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>Confirm Details</Breadcrumb.Item>
      </Breadcrumb>

      { contact ?
        <div>
          <PlayerDetailCard player={contact} title="Verify Player Information" photo={photo} />

          <div style={{ margin: '16px 0' }}>
            <Checkbox onChange={onChange}>
              I declare that the particulars given above are true to the best of my knowledge and belief. I shall abide by the rules and regulations and the latest amendments and decisions of the State / District Chess Association / Federation as the case may be and cooperate with the officials in participating in State and National Tournaments / Championships.
           </Checkbox>
          </div>
          <Space style={{ margin: '16px 0' }} size="middle">
            <Button onClick={()=>history.goBack()} size="large">Cancel</Button>
            <Button type="primary" loading={btnLoading} onClick={() => handleSubmitForm()} size="large">
              Proceed to Pay
             </Button>
          </Space>
        </div>
        : <Loader />}
    </AppLayout>
  );
}



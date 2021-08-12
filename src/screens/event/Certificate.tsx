import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Form } from 'antd';
import Axios from 'axios';
import NTRCertificate from '@components/NTRCertificate';

export default function Certificate() {
  const [btnLoading, setbtnLoading] = useState(false);
  const [aicf, setAicf] = useState('');
  const [dLink, setDLink] = useState('');

  const onFinish = async (values: any) => {
    const aicf_id = aicf;
    if (!aicf_id) return;
    try {
      setbtnLoading(true);
      const { data } = await Axios.post(`verify-otp`, { aicf_id: aicf_id, otp: values.otp });
      setbtnLoading(false);
      if (data.link) {
        setDLink(data.link);
        openInNewTab(data.link);
      }
    } catch (error) {
      setbtnLoading(false);
    }
  };

  const openInNewTab = (url: any) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>Download Certificate</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name="entry-school"
        onFinish={onFinish}
        scrollToFirstError={true}
        layout="vertical"
        style={{ marginTop: '10px' }}
      >
        <NTRCertificate btnLoading={btnLoading} setAicf={setAicf} dLink={dLink} />
      </Form>
    </AppLayout>
  );
}

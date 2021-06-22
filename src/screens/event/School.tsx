import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Loader from '@components/loader/Loader';
import NTRSChoolForm from '@components/NTRSchool';

export default function SchoolEntry() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);
  const [playerId, setPlayerId] = useState(0);
  const [passportPhoto, setPassportPhoto] = useState(0);
  const [birthCertificate, setBirthCertificate] = useState(0);
  const [bonafideCertificate, setBonafideCertificate] = useState(0)

  const onFinish = async (values: any) => {
    if (!playerId) return message.error('Player detail required');
    const params = {
      ...values,
      contact_id: playerId,
      birth_certificate_photo: birthCertificate ? birthCertificate : null,
      passport_photo: passportPhoto ? passportPhoto : null,
      bonafide_certificate: bonafideCertificate ? bonafideCertificate : null,
      state: values.state ? values.state.value : null,
      city: values.city ? values.city.value : null,
      district: values.district ? values.district.value : null,
    };
    const show = message.loading('Saving Values ...', 0);
    try {
      setbtnLoading(true);
      const { data } = await Axios.post(`events/school`, params);
      setTimeout(show, 0);
      history.push('checkout', { order_id: data?.order?.id });
      setbtnLoading(false);
    } catch (error) {
      setbtnLoading(false);
      setTimeout(show, 0);
      setbtnLoading(false);
      if (error?.response?.data?.errors) {
        const { birth_certificate_photo, passport_photo} = error?.response?.data?.errors;
        if (passport_photo) message.warning(passport_photo?.[0]);
        if (birth_certificate_photo) message.warning(birth_certificate_photo?.[0]);
      }
    }
  };

  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>NATIONAL SCHOOL CHESS CHAMPIONSHIP – 2021</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name="entry-school"
        onFinish={onFinish}
        scrollToFirstError={true}
        layout="vertical"
        style={{ marginTop: '10px' }}
      >
        {loading ? (
          <Loader />
        ) : (
          <NTRSChoolForm
            btnLoading={btnLoading}
            setPlayerId={setPlayerId}
            setBirthCertificate={setBirthCertificate}
            setPassportPhoto={setPassportPhoto}
            setBonafideCertificate={setBonafideCertificate}
          />
        )}
      </Form>
    </AppLayout>
  );
}

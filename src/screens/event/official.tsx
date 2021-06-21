import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Form, message, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { IEvent } from '../../schemas/IEvent';
import Loader from '@components/loader/Loader';
import AbroadForm from '@components/AbroadForm';

export default function OfficialEvent() {
  const history = useHistory();
  const [events, setEvents] = useState([] as Array<IEvent>);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);
  const [playerId, setPlayerId] = useState(0);
  const [birthCertificate, setBirthCertificate] = useState(0);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get(`events`);
      setEvents(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values: any) => {
    if (!playerId) return message.error('Player detail required');
    const params = {
      ...values,
      contact_id: playerId,
      birth_certificate_photo: birthCertificate ? birthCertificate : null,
      state: values.state ? values.state.value : null,
      city: values.city ? values.city.value : null,
      district: values.district ? values.district.value : null,
    };
    const show = message.loading('Saving Values ...', 0);
    try {
      setbtnLoading(true);
      const { data } = await Axios.post(`events/offical`, params);
      setTimeout(show, 0);
      if(!data.order?.id && data.is_free == 1){
        openNotifyOrderConfirmWithIcon();
        setbtnLoading(false);
        history.push('/');
        return;
      }else{
        history.push('checkout', { order_id: data?.order?.id });
        setbtnLoading(false);
        return;
      }
    } catch (error) {
      setbtnLoading(false);
    }
  };


  const openNotifyOrderConfirmWithIcon = () => {
    notification.success({
      message: 'Successfully Registred!',
      duration:10,
      description:
        <> <p>Successfully Registered for Offical Abroad.</p></>
    });
  };


  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>Offical Abroad Registration</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name="register"
        onFinish={onFinish}
        scrollToFirstError={true}
        layout="vertical"
        style={{ marginTop: '10px' }}
      >
        {loading ? (
          <Loader />
        ) : (
          <AbroadForm btnLoading={btnLoading} events={events} setPlayerId={setPlayerId} setBirthCertificate={setBirthCertificate} />
        )}
      </Form>
    </AppLayout>
  );
}

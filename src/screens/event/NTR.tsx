import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Form, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Axios from 'axios';
import NTRFormItems from '@components/NTRForm';
import { IEvent } from '../../schemas/IEvent';
import Loader from '@components/loader/Loader';

export default function NationalTournamentRegistration() {
  const history = useHistory();
  const [events, setEvents] = useState([] as Array<IEvent>);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);
  const [playerId, setPlayerId] = useState(0);

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
      contact_id: playerId
    };
    const show = message.loading('Saving Values ...', 0);
    try {
      setbtnLoading(true);
      const { data } = await Axios.post(`events/${params.event}/register`, params);
      setTimeout(show, 0);
      history.push('checkout', { order_id: data?.order?.id });
      setbtnLoading(false);
    } catch (error) {
      setbtnLoading(false);
    }
  };

  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>National Tournament Registration</Breadcrumb.Item>
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
          <NTRFormItems btnLoading={btnLoading} events={events} setPlayerId={setPlayerId} />
        )}
      </Form>
    </AppLayout>
  );
}

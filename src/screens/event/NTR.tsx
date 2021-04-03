import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Form, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Axios from 'axios';
import NTRFormItems from '@components/NTRForm';

export default function NationalTournamentRegistration() {
    const history = useHistory();
    const { state }: any = useLocation();
    const contact: any = state?.contact;


    const [btnLoading, setbtnLoading] = useState(false);
    const onFinish = (values: any) => {
        const data = {
            ...contact,
        };
        console.log(data);
        return;
        handleSubmitForm(data);
    };

    const handleSubmitForm = async (values: JSON) => {
        const show = message.loading('Saving Values ...', 0);
        setbtnLoading(true);
        try {
            const { data } = await Axios.post(`contacts`, values);
            setTimeout(show, 0);
            if (data?.contact) {
                message.success("Data stored successfully.");
                setbtnLoading(false);
                history.push('/confirm', data);
            }
        } catch (error) {
            setTimeout(show, 0);
            setbtnLoading(false);
            if (error?.response?.data?.errors) {
                const { email, mobile, player_type, birth_certificate, passport_photo, birth_certificate_photo } = error?.response?.data?.errors;
                if (email) message.warning(email?.[0]);
                if (mobile) message.warning(mobile?.[0]);
                if (player_type) message.warning(birth_certificate?.[0]);
                if (passport_photo) message.warning(passport_photo?.[0]);
                if (birth_certificate_photo) message.warning(birth_certificate_photo?.[0]);
            }
        }
    }
    return <AppLayout>
        <Breadcrumb>
            <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
            <Breadcrumb.Item>New Registration</Breadcrumb.Item>
        </Breadcrumb>
        <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical" >
            <NTRFormItems btnLoading={btnLoading} />
        </Form>
    </AppLayout>
}

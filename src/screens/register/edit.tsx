import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Form, message } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Axios from 'axios';
import { IContact } from '../../schemas/IContact';
import Loader from '@components/loader/Loader';
import RegisterForm from '@components/RegisterForm';

export default function EditPlayer(props: any) {
    const [isloading, setIsloading] = useState(true);
    const history = useHistory();
    const [passportPhoto, setPassportPhoto] = useState(0);
    const [birthCertificate, setBirthCertificate] = useState(0);
    const [contact, setContact] = useState({} as IContact);
    const { search }: any = useLocation();
    const {id}:any = useParams();
    const query = new URLSearchParams(search);
    const hash = query.get('hash');

    const [btnLoading, setbtnLoading] = useState(false);
    const onFinish = (values: any) => {
        const data = {
            ...values,
            date_of_birth: values?.date_of_birth?.format(dateFormat),
            passport_photo: passportPhoto ? passportPhoto : null,
            birth_certificate_photo: birthCertificate ? birthCertificate : null,
            id: contact ? contact.id : null
        };

        // console.log(data);
        // return ;
        handleSubmitForm(data);
    };

    const handleSubmitForm = async (values: JSON) => {
        const show = message.loading('Saving Values ...', 0);
        setbtnLoading(true);
        try {
            const { data } = await Axios.post(`contacts?action=update`, values);
            setTimeout(show, 0);
            message.success("Updated successfully.");
            history.replace('/');
            setbtnLoading(false);
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

    useEffect(() => {
        if (id && hash) getData();
        else{
            message.error("Player not found");
            return history.go(-1);
        }
    }, [id])

    const getData = async () => {
        setIsloading(true);
        try {
            // &hash=${hash}
            const { data } = await Axios.get(`players/${id}?with_no_hash=1&hash=${hash}`);
            if (data?.player) setContact(data.player);
            setIsloading(false);
        } catch (error) {
            setIsloading(false);
        }
    };


    return (
        <AppLayout>
            <Breadcrumb>
                <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
                <Breadcrumb.Item>New Registration</Breadcrumb.Item>
            </Breadcrumb>
            {isloading ? <Loader /> :
            <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical" >
                   <RegisterForm btnLoading={btnLoading} contact={contact} setPassportPhoto={setPassportPhoto} setBirthCertificate={setBirthCertificate} />
            </Form>}
        </AppLayout>
    );
}


const dateFormat = 'DD-MM-YYYY';
import React, { useState } from 'react';
import AppLayout from '@layout/app';
import RegisterForm from '@components/RegisterForm';
import { Breadcrumb, Form, message } from 'antd';
import Axios  from 'axios';
import { useHistory } from 'react-router-dom';
import { createHashHistory } from 'history';

// tslint:disable-next-line:function-name
export default function Register(props:any) {
  const history = useHistory();
const def = props?.history?.location?.state;
console.log(def)
  const [btnLoading, setbtnLoading] = useState(false);
  const onFinish = (values: any) => {

    const data = {
      ...values,
      DOB: values.DOB?.format(dateFormat),
    };
    handleSubmitForm(data);
  };

  const handleSubmitForm = async (values:JSON) =>{
   
    history.push({pathname:"/confirm",state:values})
  }


  return (
    <AppLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>New Registration</Breadcrumb.Item>
      </Breadcrumb>
      <Form name="register" onFinish={onFinish} scrollToFirstError={true} layout="vertical">
        <RegisterForm btnLoading={btnLoading} default={def}/>
      </Form>
    </AppLayout>
  );
}


const dateFormat = 'DD-MM-YYYY';
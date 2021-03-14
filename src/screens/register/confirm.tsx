import React, { useState } from 'react';
import AppLayout from '@layout/app';
import { Breadcrumb, Button, message, Descriptions, Badge, Checkbox } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../../shared/components/loader/Loader';
import moment from 'moment';


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


  // const handleEditForm = async() =>{
  //   history.push(`/new-register`,state);
  // }


  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>AICF PRS</Breadcrumb.Item>
        <Breadcrumb.Item>Confirm Details</Breadcrumb.Item>
      </Breadcrumb>

      { contact ?
        <div>
          <Descriptions title="Verify Player Information" bordered={true}>
            <Descriptions.Item label="Passport Photo" >
              <img src={photo?.original} width="100px" height="auto" alt="profile" />
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {contact?.first_name + " " } 
              {contact?.middle_name && contact?.middle_name} 
              {" " + contact?.last_name}
            </Descriptions.Item>


            <Descriptions.Item label="Email">{contact?.email}</Descriptions.Item>
            <Descriptions.Item label="Mobile No" span={2}>
              {contact?.mobile}
            </Descriptions.Item>

            <Descriptions.Item label="Son/Daughter of" >{contact?.son_daughter_of}</Descriptions.Item>
            <Descriptions.Item label="Relationship">{contact?.relationship}</Descriptions.Item>
            <Descriptions.Item label="Mother Tounge">{contact?.mother_tounge}</Descriptions.Item>

            <Descriptions.Item label="Gender" span={1}>
              <Badge status="processing" text={contact?.gender} />
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth" span={2}>
              {contact?.date_of_birth ? moment(contact.date_of_birth).format('DD-MM-YYYY') : null}
            </Descriptions.Item>

            <Descriptions.Item label="Address" span={1}>{contact?.address}</Descriptions.Item>
            <Descriptions.Item label="Location" span={2}>
              City: <b>{contact?.city}</b>
              <br />
              District: <b>{contact?.district}</b>
              <br />
              State: <b>{contact?.state}</b>
              <br />
            </Descriptions.Item>

            <Descriptions.Item label="Registration Type" span={1}>
              <Badge status="processing" text={contact?.player_type} />
            </Descriptions.Item>
            <Descriptions.Item label="Are you a PIO/OCI">{contact?.POI}</Descriptions.Item>
            <Descriptions.Item label="FIDE ID">{contact?.fide_id}</Descriptions.Item>
          </Descriptions>
          <div style={{ margin: '16px 0' }}>
            <Checkbox onChange={onChange}>
              I declare that the particulars given above are true to the best of my knowledge and belief. I shall abide by the rules and regulations and the latest amendments and decisions of the State / District Chess Association / Federation as the case may be and cooperate with the officials in participating in State and National Tournaments / Championships.
           </Checkbox>
          </div>
          <div style={{ margin: '16px 0' }}>
            <Button type="primary" loading={btnLoading} onClick={() => handleSubmitForm()} size="large">
              Proceed to Pay
             </Button>
          </div>
        </div>
        : <Loader />}
    </AppLayout>
  );
}



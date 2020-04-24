import React, { useState } from 'react';
import ActionForm from './index';
import { Button } from 'antd';

const CreateButton = (props) => {
  const { name, type,setEvent} = props;
  const [modal2Visible, setModal2Visible] = useState(false);
  const handleClick = () => {
    setModal2Visible(true);
  };
  return (
    <>
      <Button onClick={handleClick} type={type}>
        {name}
      </Button>
      <ActionForm
        modal2Visible={modal2Visible}
        setModal2Visible={setModal2Visible}
        event={null}
        setEvent={setEvent}
      />
    </>
  );
};
export default CreateButton;

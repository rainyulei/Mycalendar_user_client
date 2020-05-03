/*
 * @Author: yu-lei 
 * @Date: 2020-04-10 11:29:09 
 * @Last Modified by: yu-lei
 * @Last Modified time: 2020-04-14 12:13:09
 */

import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import TodoLayout from '../../layout/todo';
import ItemList from '../../components/itemList';
import Mycalendar from '../../components/mycalendar';
import MyTimeLine from '../../components/timeline';
// import Reminder from '../../components/reminders';
import DefaultLoading from '../../components/loading';
import Header from '../../components/header';
import { connect } from 'react-redux';
import { findEvent,initSetting } from '../../store/action/actions';
import ActionModel from '../../components/actionModel';
import { createDate} from '../../utiles'
const state = ({ event }) => {
  return {
    date: event.date,
  };
};
function ButtonGroup(props) {
  const { setModal2Visible,setEvent } = props;
  const handleClick = () => {
    setEvent(null)
    setModal2Visible(true);
  };
  return (
    <Button.Group>
      <Button onClick={handleClick} type="primary">add new action</Button>
      <Mycalendar />
      <MyTimeLine />
    </Button.Group>
  );
}
function Todo(props) {
  const { findEvent, date,initSetting } = props;
  const [modal2Visible, setModal2Visible] = useState(false);
  const [event, setEvent] = useState(null);
  useEffect(() => {
    if (!date) {
      const nowDay = createDate()
      findEvent(nowDay);
    }
  }, [date, findEvent]);
  useEffect( () =>{
    initSetting()
    console.log('initsetting调用了几次')
  },[initSetting])
  
  return date ? (
    <>
     <TodoLayout>
      <Header />
      <ButtonGroup
        modal2Visible={modal2Visible}
        setModal2Visible={setModal2Visible}
        setEvent={setEvent}
        event={event}
      />
      <ItemList
        setModal2Visible={setModal2Visible}
        setEvent={setEvent}
      />
      {/* <Reminder style={{ float: 'right' }}></Reminder> */}
    </TodoLayout>
     <ActionModel
     modal2Visible={modal2Visible}
     setModal2Visible={setModal2Visible}
     setEvent={setEvent}
     event={event}
   />
    </>
  ) : (
    <DefaultLoading />
  );
}

export default connect(state, { findEvent ,initSetting})(Todo);

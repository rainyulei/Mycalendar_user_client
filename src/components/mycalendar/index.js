/*
 * @Author: yu-lei
 * @Date: 2020-04-10 09:06:11
 * @Last Modified by: yu-lei
 * @Last Modified time: 2020-04-10 09:28:12
 */

import React, { useState, useRef } from 'react';
import { Drawer, Button, Calendar, Badge } from 'antd';
import { connect } from 'react-redux';
import { findEvent } from '../../store/action/actions';
import moment from 'moment';
import { createDate, sortDataListByStartAt } from '../../utiles';
import './index.css';
import store2 from 'store2';

function Mycalendar(props) {
  const { findEvent } = props;
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('month');
  const initRef = useRef(null);
  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);
  const getListData = (value) => {
    const Alldata = store2.getAll();
    const listData = Alldata[createDate(value)];
    return listData || [];
  };
  const dateCellRender = (value) => {
    let listData = getListData(value);
    if (listData.length > 0) {
      listData = sortDataListByStartAt(listData);
      return (
        <ul className='events'>
          {listData.map((item) => {
            if (!item.finished && (item.important || item.focus)) {
              return (
                <li key={item.id}>
                  <Badge
                    status={
                      item.important ? 'error' : item.focus ? 'warning' : ''
                    }
                    text={item.title}
                  />
                </li>
              );
            }
          })}
        </ul>
      );
    }
  };
  const onSelect = (value) => {
    if (mode === 'year') {
      setMode('month');
    } else if (mode === 'month') {
      let currentdate = moment();
      if (initRef.current) {
        currentdate = initRef.current;
      }
      if (value.get('date') !== currentdate.get('date')) {
        const date = createDate(value);
        initRef.current = value;
        findEvent(date);
        setVisible(false);
      }
    }
    return value;
  };
  const onPanelChange = (value, ...others) => {
    const a = others[0];
    setMode(a);
  };
  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        Event Calendar
      </Button>
      <Drawer
        title='Choose a date!'
        width={'75%'}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          ></div>
        }
      >
        <Calendar
          onSelect={onSelect}
          mode={mode}
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
        />
      </Drawer>
    </>
  );
}
export default connect(null, { findEvent })(Mycalendar);

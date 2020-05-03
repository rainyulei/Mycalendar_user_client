import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Statistic, Card } from 'antd';
import './index.css';
function Timer(props) {
  const { forceUpdate, time, day } = props;
  const useref = useRef();
  const startTimer = () => {
    useref.current = window.setInterval(forceUpdate, 780);
  };
  const stopTimer = () => {
    clearInterval(useref.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  });
  return (
    <Card
      style={{
        height: '85px',
        border: 'none',
      }}
    >
      <Statistic title={day} value={time} />
    </Card>
  );
}
function Timerswgger() {
  const [time, setTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [day, setDay] = useState('');
  const forceUpdate = () => {
    const a = moment().format('YYYY-MM-DD HH:mm:ss');
    setDay(a.split(' ')[0]);
    setTime(a.split(' ')[1]);
  };
  return (
    <div className='timer'>
      <Timer time={time} day={day} forceUpdate={forceUpdate} />
    </div>
  );
}
export default Timerswgger;

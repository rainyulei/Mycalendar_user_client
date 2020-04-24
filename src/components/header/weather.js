import React, { useEffect, useRef, useState } from 'react';
import { Typography, Row, Col } from 'antd';
import './weather.css';
import moment from 'moment';

function Timer(props) {
  const { forceUpdate, time } = props;
  const useref = useRef();
  const startTimer = () => {
    useref.current = window.setInterval(forceUpdate, 250);
  };
  const stopTimer = () => {
    clearInterval(useref.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  });
  return <Col span={6}>{time}</Col>;
}

function Weather() {
  const [time, setTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  
 
  const forceUpdate = () => {
    setTime(moment().format('YYYY-MM-DD HH:mm:ss'));
  };
  return (
    <Typography.Title level={4}>
      <Row gutter={16}>
        <Col span={6}>
          <div id='he-plugin-simple'></div>
        </Col>
        <Timer time={time} forceUpdate={forceUpdate} />
      </Row>
    </Typography.Title>
  );
}

export default Weather;

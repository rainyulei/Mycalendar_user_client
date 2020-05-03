/*
 * @Author: yu-lei
 * @Date: 2020-04-29 13:35:06
 * @Last Modified by: yu-lei
 * @Last Modified time: 2020-04-29 19:06:18
 * weather component
 */
import React, { useState, useEffect, useRef } from 'react';
import { getAreaCountries } from '../../connect/index';
import { getweatherAction } from '../../store/action/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Avatar, Space, Statistic } from 'antd';
import './index.css';
// component
import CityModel from './cityModal';
import FullSizeWeather from './fullSizeWeather';

const { Meta } = Card;

function Weather(props) {
  const { weather, getweatherAction } = props;
  const [cityModalVisi, setcityModalVisi] = useState(false);
  const [fullWeatherVisi, setfullWeatherVisi] = useState(false);
  const [city, setCity] = useState('');
  const [weatherNow, setWeatherNow] = useState('');
  // geweather init
  const weatherRef = useRef;
  const frueshWeather = weathers => {
    (function auto() {
      for (let i = 0; i < weathers.length; i++) {
        const element = weathers[i];
        // TODO 比较小时数相同
        const eleTime = moment(element.dt_txt);
        const nowTime = moment();
        if (
          eleTime.diff(nowTime) > 0 &&
          eleTime.diff(nowTime) < 12 * 60 * 60 * 1000
        ) {
          return setWeatherNow(element);
        }
      }
      weatherRef.current = setInterval(auto, 3600000);
    })();
  };
  const stopfrueshWeather = () => {
    clearInterval(weatherRef.current);
  };
  useEffect(() => {
    if (!weather.weather || !weather.city) {
      getweatherAction();
    } else {
      setCity(weather.city);
    }
  }, [weather, getweatherAction]);
  useEffect(() => {
    if (weather.weather) {
      let wea = weather.weather;

      frueshWeather(wea);
    }
    return stopfrueshWeather;
  });
  useEffect(() => {
    if (city) {
      getweatherAction(city);
    }
  }, [city, getweatherAction]);

  const handleCityClick = handleCityClick => {
    setcityModalVisi(true);
  };
  const City = () => {
    return (
      <Space size=''>
        <span className='city'>{city}</span>
        <span className='weather_message'>{/* {weatherNow.weather} */}</span>
      </Space>
    );
  };
  const Description = () => {
    return (
      <Space size='large'>
        <Statistic title='Day-Tem' value={weatherNow.temp} suffix='℃' />
        <Statistic title='Night-Tem' value={weatherNow.temp} suffix='℃' />
        <Statistic title='Hr' value={weatherNow.humidity} />
        <Statistic title='Wind' value={weatherNow.wind.speed} suffix='L' />
      </Space>
    );
  };
  console.log(weather);
  const handleFullWeatherClick = () => {
    setfullWeatherVisi(true);
  };
  return weatherNow ? (
    <div className='weather'>
      <Card style={{ height: '85px', border: 'none', float: 'left' }}>
        <Meta
          onClick={handleCityClick}
          avatar={
            <Avatar
              src={`http://openweathermap.org/img/wn/${weatherNow.weather.icon}@2x.png`}
            />
          }
          title={<City />}
          description={weatherNow.weather.description}
        />
      </Card>
      <Card
        style={{ height: '85px', border: 'none', float: 'left' }}
        onClick={handleFullWeatherClick}
      >
        <Description />
      </Card>

      <CityModel
        visible={cityModalVisi}
        setVisible={setcityModalVisi}
        setCity={setCity}
      />
      <FullSizeWeather
        visible={fullWeatherVisi}
        setvisible={setfullWeatherVisi}
      />
    </div>
  ) : (
    ''
  );
}
const state = ({ weather }) => {
  return {
    weather,
  };
};
export default connect(state, { getweatherAction })(Weather);

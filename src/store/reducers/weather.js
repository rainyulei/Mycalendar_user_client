import { Weather } from '../action/actionTypes';
const initWeather = {
  weather: '',
};

export default (state = initWeather, action) => {
  switch (action.type) {
    case Weather.GET_WEATHER:
      const weather = { ...state, ...action.payload };
      return weather;
    default:
      return state;
  }
};

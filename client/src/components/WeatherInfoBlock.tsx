import '../css/layout.css';
import PropTypes from 'prop-types';

function WeatherInfoBlock(props: any) {
  const hotWeatherThreshold: number = 25;
  const coldWeatherThreshold: number = 18;
  const weatherTemp = props.weather.temp;

  return (
    <div className='weather-info-block'>
      {weatherTemp >= hotWeatherThreshold && <img src='/images/summer-tp-s.png' height={20}/>}
      {weatherTemp <= coldWeatherThreshold && <img src='/images/winter-tp-s.png' height={20}/>}
      {weatherTemp < hotWeatherThreshold && weatherTemp > coldWeatherThreshold && <img src='/images/happy-weather.png' />}
      <span><strong>Overall:</strong> {props.weather.shortDesc}</span>
      <span><strong>Description:</strong> {props.weather.description}</span>
      <span><strong>Temperature:</strong> {weatherTemp} Celsius</span>
    </div>
  );
}

WeatherInfoBlock.propTypes = {
  weather: PropTypes.object,
};

export default WeatherInfoBlock;
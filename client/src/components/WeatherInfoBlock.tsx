import '../css/layout.css';
import PropTypes from 'prop-types';

function WeatherInfoBlock(props: any) {
  return (
    <div className='weather-info-block'>
      <span>{props.weather.shortDesc}</span>
      <span>{props.weather.description}</span>
      <span>{props.weather.temp}</span>
    </div>
  );
}

WeatherInfoBlock.propTypes = {
  weather: PropTypes.object,
};

export default WeatherInfoBlock;
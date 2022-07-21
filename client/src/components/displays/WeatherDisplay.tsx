import '../../css/layout.css';
import PropTypes from 'prop-types';
import AuthCtx from '../../context/auth-context';
import { useState, useContext } from 'react';
import { getWeather } from '../../requests/requests';
import WeatherInfoBlock from '../WeatherInfoBlock';
import Modal from '../Modal';

function WeatherDisplay(props: any) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null)

  const [modalFields, setModalFields] = useState({
    openModal: false,
    message: '',
    title: '',
  });

  const authContext = useContext(AuthCtx);

  function handleCityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  async function getWeatherHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    const weatherData = await getWeather(city, authContext?.token);

    // Not best way of doing this, should revamp how validations
    // are done, come back if time permits
    if (typeof weatherData === 'string') {
      validateWeather();
    } else {
      setWeather(weatherData);
    }
  }

  function validateWeather() {
      setModalFields({
        message: 'There was a problem getting the weather for your given city...',
        title: 'Oops...',
        openModal: true,
      });
  }

  return (
    <>
      <span className="display-title-text">Weather Display</span>
      {
        weather &&
        <WeatherInfoBlock weather={weather} />
      }
      <form className='weather-form' onSubmit={getWeatherHandler}>
        <input id='weather-city' className='form-input' placeholder='Input your city' name='city' type="text" value={city} onChange={handleCityChange} />
        <button className='regular-button' style={{width: '100%'}} type="button">
          Get the weather!
        </button>
      </form>
      <Modal
        open={modalFields.openModal}
        onClose={() => setModalFields(prevState => ({ ...prevState, openModal: false }))}
        message={modalFields.message}
        title={modalFields.title}
      />
    </>
  );
}

WeatherDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
};

export default WeatherDisplay;
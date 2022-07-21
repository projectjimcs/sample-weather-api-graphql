import '../../css/layout.css';
import PropTypes from 'prop-types';

function WeatherDisplay(props: any) {
  function buttonHandler(display: string) {
    props.changeDisplay(display);
  }

  return (
    <>
      <span className="display-title-text">Weather Display</span>
      <button type="button" onClick={() => buttonHandler('register')}>
        Get the weather!
      </button>
    </>
  );
}

WeatherDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
};

export default WeatherDisplay;
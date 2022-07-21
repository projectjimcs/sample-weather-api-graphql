import '../../css/layout.css';
import PropTypes from 'prop-types';

function DefaultDisplay(props: any) {
  // !!! This looks to be a good candidate for HOC, come back to if have time
  function buttonHandler(display: string) {
    props.changeDisplay(display);
  }

  return (
    <>
      <img src='/images/main-weather.png' />
      <span className="main-title-text">Log in to see get the weather!</span>
      <button className='regular-button' type="button" onClick={() => buttonHandler('register')}>
        Register
      </button>
      <button className='regular-button' type="button" onClick={() => buttonHandler('login')}>
        Login
      </button>
    </>
  );
}

DefaultDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
};

export default DefaultDisplay;
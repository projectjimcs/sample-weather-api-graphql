import '../../css/layout.css';
import PropTypes from 'prop-types';

function RegisterDisplay(props: any) {
  function buttonHandler(display: string) {
    props.changeDisplay(display);
  }

  return (
    <>
      <span className="display-title-text">Login</span>
      <button type="button" onClick={() => buttonHandler('register')}>
        Register
      </button>
      <button type="button" onClick={() => buttonHandler('default')}>
        Back
      </button>
    </>
  );
}

RegisterDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
};

export default RegisterDisplay;
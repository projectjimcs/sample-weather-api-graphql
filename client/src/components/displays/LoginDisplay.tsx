import '../../css/layout.css';
import PropTypes from 'prop-types';

function LoginDisplay(props: any) {
  function buttonHandler(display: string) {
    props.changeDisplay(display);
  }

  return (
    <>
      <span className="display-title-text">Login</span>
      <button type="button" onClick={() => buttonHandler('register')}>
        Login
      </button>
      <button type="button" onClick={() => buttonHandler('default')}>
        Back
      </button>
    </>
  );
}

LoginDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
};

export default LoginDisplay;
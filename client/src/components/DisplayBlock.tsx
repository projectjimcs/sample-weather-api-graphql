import '../css/layout.css';
import PropTypes from 'prop-types';
import DefaultDisplay from './displays/DefaultDisplay';
import AuthDisplay from './displays/AuthDisplay';
import WeatherDisplay from './displays/WeatherDisplay';

function DisplayBlock(props: any) {
  // In case I want to add more displays here
  const displayMapping: any = {
    default: <DefaultDisplay changeDisplay={props.changeDisplay} display={props.display} />,
    register: <AuthDisplay changeDisplay={props.changeDisplay} display={props.display} />,
    login: <AuthDisplay changeDisplay={props.changeDisplay} display={props.display} />,
    weather: <WeatherDisplay changeDisplay={props.changeDisplay} display={props.display} />,
  }

  return (
    <div className='display-block'>
      {displayMapping[props.display]}
    </div>
  );
}

DisplayBlock.propTypes = {
  display: PropTypes.string.isRequired,
  changeDisplay: PropTypes.func.isRequired,
};

export default DisplayBlock;
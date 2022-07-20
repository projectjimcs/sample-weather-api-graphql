import '../css/layout.css';
import PropTypes from 'prop-types';
import DefaultDisplay from './displays/DefaultDisplay';
import RegisterDisplay from './displays/RegisterDisplay';
import LoginDisplay from './displays/LoginDisplay';

function DisplayBlock(props: any) {
  const displayMapping: any = {
    default: <DefaultDisplay changeDisplay={props.changeDisplay} />,
    register: <RegisterDisplay changeDisplay={props.changeDisplay} />,
    login: <LoginDisplay changeDisplay={props.changeDisplay} />,
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
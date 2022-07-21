import '../css/modal.css';
import PropTypes from 'prop-types';

function Modal(props: any) {
  if (!props.open) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div><h2>{props.title}</h2></div>
        <div className="modal-content">{props.message}</div>
        <button className="regular-button" onClick={props.onClose}>Close button</button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default Modal;
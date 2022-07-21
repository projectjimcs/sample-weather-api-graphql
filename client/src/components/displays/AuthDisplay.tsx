import '../../css/layout.css';
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { login, register } from '../../requests/requests';
import AuthCtx from '../../context/auth-context';
import Modal from '../../components/Modal';

function AuthDisplay(props: any) {
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
  });

  const [modalFields, setModalFields] = useState({
    openModal: false,
    message: '',
    title: '',
  });

  const authContext = useContext(AuthCtx);

  function buttonHandler(display: string) {
    props.changeDisplay(display);
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const field = event.target.name;

    setFormFields(prevState => ({
      ...prevState,
      [field]: value
    }));
  }

  async function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();
    const username = formFields.username;
    const password = formFields.password;

    if (props.display === 'login') {
      const loginData: any = await login(username, password);

      // Not the best handler, should actually revamp how
      // the validations are done, come back if time permits
      if (typeof loginData === 'string') {
        validateAuth('login', loginData);
      } else {
        authContext?.login(loginData.token, loginData.userId);
      }
    } else {
      const result = await register(username, password)
      validateAuth('register', result);
    }
  }

  function validateAuth(source: string, result: string) {
    if (result === 'success') {
      const message = source === 'login' ? 'Login successful!' : 'Registration successful!'

      setModalFields({
        message: message,
        title: 'Success',
        openModal: true,
      });
    } else {
      setModalFields({
        message: result,
        title: 'Oops...',
        openModal: true,
      });
    }
  }

  return (
    <>
      <span className="display-title-text">{props.display === 'login' ? 'LOGIN' : 'REGISTRATION'}</span>
      <form className='register-form' onSubmit={submitForm}>
        {/* !!! come back to these on change handlers if time permits */}
        <input id='username' className='form-input' placeholder='Username' name='username' type="text" value={formFields.username} onChange={handleFormChange} />
        <input id='password' className='form-input' placeholder='Password' name='password' type="password" value={formFields.password} onChange={handleFormChange} />
        <div className='auth-button-block'>
          <button className='form-button' type="submit">{props.display === 'login' ? 'Login' : 'Register'}</button>
          <button className='form-button' type="button" onClick={() => buttonHandler('default')}>Back</button>
        </div>
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

AuthDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
};

export default AuthDisplay;
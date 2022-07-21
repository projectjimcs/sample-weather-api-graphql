import '../../css/layout.css';
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { login, register } from '../../requests/requests';
import AuthCtx from '../../context/auth-context';

function AuthDisplay(props: any) {
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
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
    console.log('got here')
    if (props.display === 'login') {
      const loginData: any = await login(username, password);
      authContext?.login(loginData.token, loginData.userId);
    } else {
      register(username, password);
    }
  }

  return (
    <>
      <span className="display-title-text">{props.display === 'login' ? 'Login' : 'Register'}</span>
      <form className='register-form' onSubmit={submitForm}>
        {/* !!! come back to these on change handlers if time permits */}
        <div><input id='username' className='form-input' placeholder='Username' name='username' type="text" value={formFields.username} onChange={handleFormChange} /></div>
        <div><input id='password' className='form-input' placeholder='Password' name='password' type="password" value={formFields.password} onChange={handleFormChange} /></div>
        <div><button className='form-button' type="submit">{props.display === 'login' ? 'Login' : 'Register'}</button></div>
        <div><button className='form-button' type="button" onClick={() => buttonHandler('default')}>Back</button></div>
      </form>

    </>
  );
}

AuthDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
};

export default AuthDisplay;
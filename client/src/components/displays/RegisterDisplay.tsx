import '../../css/layout.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function RegisterDisplay(props: any) {
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
  });

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

  function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();
    const username = formFields.username;
    const password = formFields.password;

    console.log(username)
    console.log(password)
  }

  return (
    <>
      <span className="display-title-text">Register</span>
      <form className='register-form' onSubmit={submitForm}>
          {/* !!! come back to these on change handlers if time permits */}
          <input id='username' className='form-input' placeholder='Username' name='username' type="text" value={formFields.username} onChange={handleFormChange} />
          <input id='password' className='form-input' placeholder='Password' name='password' type="password" value={formFields.password} onChange={handleFormChange} />
        <button className='form-button' type="submit">Register</button>
        <button type="button" onClick={() => buttonHandler('default')}>
          Back
        </button>
      </form>

    </>
  );
}

RegisterDisplay.propTypes = {
  changeDisplay: PropTypes.func.isRequired,
};

export default RegisterDisplay;
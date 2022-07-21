import '../css/layout.css';
import { useContext } from 'react';
import AuthCtx from '../context/auth-context';

function Header() {
  const authContext = useContext(AuthCtx);

  return (
    <div className='header'>
      <span><strong>WEATHERING</strong></span>
      {
        authContext?.token &&
        <button className='logout-button' type='button' onClick={authContext?.logout}>
          Logout
        </button>
      }
    </div>
  );
}

export default Header;
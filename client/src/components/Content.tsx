import '../css/layout.css';
import DisplayBlock from './DisplayBlock';
import { useState, useContext } from 'react';
import AuthCtx from '../context/auth-context';

function Content() {
  const [displayState, setDisplayState] = useState('default');
  const authContext = useContext(AuthCtx);

  // !!! Might put this up to the App.tsx level
  function changeDisplay(state: string) {
    setDisplayState(state);
  }

  return (
    <div className='content-area'>
      <DisplayBlock display={authContext?.token ? 'weather' : displayState} changeDisplay={changeDisplay} />
    </div>
  );
}

export default Content;
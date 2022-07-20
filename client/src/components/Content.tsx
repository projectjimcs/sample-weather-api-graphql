import '../css/layout.css';
import DisplayBlock from './DisplayBlock';
import { useState } from 'react';

function Content() {
  const [displayState, setDisplayState] = useState('default');

  function changeDisplay(state: string) {
    setDisplayState(state);
  }

  return (
    <div className='content-area'>
      <DisplayBlock display={displayState} changeDisplay={changeDisplay} />
    </div>
  );
}

export default Content;
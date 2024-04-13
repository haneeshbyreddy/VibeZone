import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const [count,setcount] = React.useState(0);
  return (
    <div >
      <h1>Lets Build VibeZone </h1>
      <button>Start</button>  
    </div>
  );
}

export default App;

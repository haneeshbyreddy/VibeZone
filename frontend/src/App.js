import './App.css';
import React from 'react';

function App() {
  return (
    <div className='nav'>
      <h1 className='main-heading'>VibeZone</h1>
      <div className='top-components'>
        <div className="navbar">
          <a className="active"><i className="fa fa-fw fa-home"></i> Home</a>
          <a><i className="fa fa-fw fa-search"></i> Search</a>
          <a><i className="fa fa-fw fa-envelope"></i> Messages</a>
          <a><i className="fa fa-fw fa-user"></i> Profile</a>
        </div>
      </div>
    </div>
  );
}

export default App;


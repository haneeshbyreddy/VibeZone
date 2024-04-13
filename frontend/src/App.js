import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  
  return (
    <div className='nav'>
      
        <h1 className='main-heading'>VibeZone</h1>
        <div className='top-components'>
        <div class="navbar">
          <a class="active" href="#"><i class="fa fa-fw fa-home"></i> Home</a> 
          <a href="#"><i class="fa fa-fw fa-search"></i> Search</a> 
          <a href="#"><i class="fa fa-fw fa-envelope"></i> Messages</a> 
          <a href="#"><i class="fa fa-fw fa-user"></i> Profile</a>
</div>
        </div>
    </div>
  );
}

export default App;

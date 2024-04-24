import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Profile_data} from './profile'

function App() {
  const [user, setUser] = useState({ "name":"Demo" })
  const [refreshPosts, setRefreshPosts] = useState(false)

  useEffect( () => {
    fetch('http://localhost:3001/api/661e94247ad53f4fefd1fdf4', { method: 'GET' })
    .then(data => data.json())
    .then(json => setUser(json))
  }, [refreshPosts]);

  console.log('Rendering with user:', user); 
  const handleButtonClick = () => {
    setRefreshPosts(!refreshPosts)
  };
  <BrowserRouter>
    <Routes>
      <Route path = "/profile" component = {Profile_data}></Route>
    </Routes>
  </BrowserRouter>

  return (
    <div className='wrapper'>
      <div className='content'>
        <div className='nav'>
          <h1 className='main-heading'>VibeZone</h1>
          <button onClick={handleButtonClick}>Refresh Posts</button>
          <div className="navbar">
            <a className="active"><i className="fa fa-fw fa-home"></i> Home</a>
            <a><i className="fa fa-fw fa-search"></i> Search</a>
            <a><i className="fa fa-fw fa-envelope"></i> Messages</a>
            <a><i className="fa fa-fw fa-user"></i> Profile</a>
          </div>
        </div>
        {user.posts.map((imgUrl) => (
          <div className='post'>
            <div className='post-info'>


              <img className='profile-image image' src={user.profileImage} alt='Img' />
              <div className='profile-name'>{user.name}</div>
            </div>
            <img className='post-image image' src={imgUrl} alt='Post' />

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
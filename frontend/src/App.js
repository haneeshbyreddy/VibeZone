import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({ "name":"Demo", "profileImage":"None", "posts": [] })
  const [refreshPostToggle, setRefreshPostToggle] = useState(false)

  useEffect( () => {
    fetch('https://api.vibezone.space/api/661e94247ad53f4fefd1fdf4', { method: 'GET' })
    .then(data => data.json())
    .then(json => setUser(json))
  }, [refreshPostToggle]);

  const refreshPosts = () => {
    setRefreshPostToggle(!refreshPostToggle)
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addPost = async () => {
    if (!inputValue.startsWith('https://')) {
      alert('URL must start with "https://"');
      return;
    }
    let response = await fetch('https://api.vibezone.space/api/661e94247ad53f4fefd1fdf4/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "imgURL": inputValue })
    });
    if (response.ok) {
      setRefreshPostToggle(!refreshPostToggle)
      alert('Post added successfully!');
    } else {
      alert('Failed to add Post');
    }
  };

  const deletePost = async (imgUrl) => {
    let response = await fetch('https://api.vibezone.space/api/661e94247ad53f4fefd1fdf4/deletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "imgURL": imgUrl})
    })
    if (response.ok) {
      setRefreshPostToggle(!refreshPostToggle)
      alert('Post deleted successfully!');
    } else {
      alert('Failed to delete Post');
    }
  }

  return (
    <div className='wrapper'>
      <div className='content'>
        <div className='nav'>
          <h1 className='main-heading'>VibeZone</h1>
          <div className="navbar">
            <a className="active"><i className="fa fa-fw fa-home"></i> Home</a>
            <a><i className="fa fa-fw fa-search"></i> Search</a>
            <a><i className="fa fa-fw fa-user"></i> Profile</a>
            <button onClick={refreshPosts}>Refresh Posts</button>
            <input type="url" value={inputValue} onChange={handleInputChange}/>
            <button onClick={addPost}>Add New Post</button>
          </div>
        </div>
        {user.posts.map((imgUrl, index) => (
          <div className='post' key={index}>
            <div className='post-info'>
              <img className='profile-image image' src={user.profileImage} alt='Img' />
              <div className='profile-name'>{user.name}</div>
              <button className='delete_button' onClick={() => deletePost(imgUrl)}>Delete Post</button>
            </div>
            <img className='post-image image' src={imgUrl} alt='Post' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

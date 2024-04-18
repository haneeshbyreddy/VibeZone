import ReactPullToRefresh from 'react-pull-to-refresh';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({ "name":"Demo", "profileImage":"None", "posts": [] })
  const [refreshPostToggle, setRefreshPostToggle] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Refresh Posts
  useEffect( () => {
    fetch('https://api.vibezone.space/api/661e94247ad53f4fefd1fdf4', { method: 'GET' })
    .then(data => data.json())
    .then(json => setUser(json))
  }, [refreshPostToggle]);
  const refreshPosts = () => {
    setRefreshPostToggle(!refreshPostToggle)
    alert("Posts refreshed")
  };

  // Add Post API
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
      setShowPopup(!showPopup)
      setInputValue('')
    } else {
      alert('Failed to add Post');
    }
  };

  // Delete Post API
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

  // APP return
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
            <button onClick={() => {setShowPopup(!showPopup)}}>Add Post</button>
          </div>
        </div>
        { showPopup && (
          // <h1>Hello</h1>
          <div id="popupOverlay" className="overlay-container show">
            <div className="popup-box">
              <h2 style={{color: 'green'}}>New Post</h2>
              <form className="form-container" onSubmit={(e) => { e.preventDefault(); addPost(); }}>
                <label className="form-label" htmlFor="email">Image:</label>
                <input
                  className="form-input"
                  type="url"
                  placeholder="Enter URL of the post"
                  id="email"
                  name="email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
                <button className="btn-submit" type="submit">Submit</button>
              </form>
              <button className="btn-close-popup" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
        {user.posts.map((imgUrl, index) => (
          <div className='post' key={index}>
            <div className='post-info'>
              <img className='profile-image image' src={user.profileImage} alt='Img' />
              <div className='profile-name'>{user.name}</div>
              <button className='delete_button' onClick={() => deletePost(imgUrl)}>Delete Post</button>
            </div>
            <div className='post-image'>
              <img src={imgUrl} alt='Post' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

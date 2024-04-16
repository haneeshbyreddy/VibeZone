import './App.css';
import React, { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      profileImage: "https://i.pinimg.com/236x/42/e3/41/42e3416affef618bd1cd83f0564acf53.jpg",
      profileName: "Batman",
      imageUrl: "https://i.pinimg.com/236x/fb/94/6f/fb946fe1ea1b40a3bfed299dfb2bd6e4.jpg",
    },
    {
      id: 2,
      profileImage: "https://i.pinimg.com/236x/42/e3/41/42e3416affef618bd1cd83f0564acf53.jpg",
      profileName: "Batman",
      imageUrl: "https://i.pinimg.com/236x/fb/94/6f/fb946fe1ea1b40a3bfed299dfb2bd6e4.jpg",
    },
    {
      id: 3,
      profileImage: "https://i.pinimg.com/236x/42/e3/41/42e3416affef618bd1cd83f0564acf53.jpg",
      profileName: "Batman",
      imageUrl: "https://i.pinimg.com/236x/fb/94/6f/fb946fe1ea1b40a3bfed299dfb2bd6e4.jpg",
    }
  ])

  return (
    <div className='wrapper'>
      <div className='content'>
        <div className='nav'>
          <h1 className='main-heading'>VibeZone</h1>
            <div className="navbar">
              <a className="active"><i className="fa fa-fw fa-home"></i> Home</a>
              <a><i className="fa fa-fw fa-search"></i> Search</a>
              <a><i className="fa fa-fw fa-envelope"></i> Messages</a>
              <a><i className="fa fa-fw fa-user"></i> Profile</a>
            </div>
        </div>
        {posts.map(post => (
          <div className='post' key={post.id}>
            <div className='post-info'>
              <img className='profile-image image' src={post.profileImage} alt='Img' />
              <div className='profile-name'>{post.profileName}</div>
            </div>
              <img className='post-image image' src={post.imageUrl} alt='Post' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import './profile.css';

function Profile_data(){
  const [user_data,set_user_data] = useState([{
    username:"Super_Hero",
    Bio:"Save The world",
    posts:"45",
    dp_img:"https://i.pinimg.com/236x/42/e3/41/42e3416affef618bd1cd83f0564acf53.jpg",
    fanbase:"2M",
    following:"5"

  }]);

  return (
    <div className='outerdiv'>
      <div className='Username'>{user_data[0].username}</div>
      <br></br>
      <div className='card'>
        <img className='profileimg' src = {user_data[0].dp_img}></img>
        <div className='stats'>
          <div className='posts'>
            <h4>Posts</h4>
            <h3>{user_data[0].posts}</h3>
          </div>
          <div className='fanbase'>
            <h4>fanbase</h4>
            <h3>{user_data[0].fanbase}</h3>
          </div>
          <div className='following'>
            <h4>following</h4>
            <h3>{user_data[0].following}</h3>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile_data
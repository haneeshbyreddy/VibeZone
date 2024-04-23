import React, { useState, useEffect } from 'react';
import './profile.css'
import { useLocation } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({ "name": "Demo", "profileImage": "None", "posts": [] });

    useEffect(() => {
        fetch('https://api.vibezone.space/api/661e94247ad53f4fefd1fdf4', { method: 'GET' })
        .then(data => data.json())
        .then(json => setUser(json));
    }, []);

    const { pathname } = useLocation()

    return (
    <div className='wrapper'>
        <div className='content'>
            <div className='nav'>
                <h1 className='main-heading'>VibeZone</h1>
                <div className="navbar">
                    <a href='/' className={pathname === '/' ? 'active' : ''}><i className="fa fa-fw fa-home"></i></a>
                    <a ><i className="fa fa-fw fa-search"></i></a>
                    <a href='/profile' className={pathname === '/profile' ? 'active' : ''} ><i className="fa fa-fw fa-user"></i> </a>
                </div>
            </div>
            <div className='divider'></div>
            <div className='profile_info'>
                <div className="profile_stats">
                    <img className='profile_photo' src={user.profileImage} alt='Img' />
                    <div className="posts_count">
                        <p>Posts</p>
                        <p>{user.posts.length}</p>
                    </div>
                    <div className="connections_count">
                        <p>Connections</p>
                        <p>None</p>
                    </div>
                </div>
                <div className="profile_description">{user.description}</div>
            </div>
            <div className='divider' id='img_divider'></div>
            <div className='profile_images'>
                {user.posts.map(mediaUrl => (
                    <img src={mediaUrl}></img>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Profile;
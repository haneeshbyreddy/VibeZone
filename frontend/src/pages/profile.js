import React, { useState, useEffect } from 'react';
import './profile.css'
import { useLocation } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({ "name": "Demo", "profileImage": "None", "posts": [] });
    const [refreshPostToggle, setRefreshPostToggle] = useState(false);

    useEffect(() => {
        fetch('https://api.vibezone.space/api/661e94247ad53f4fefd1fdf4', { method: 'GET' })
        .then(data => data.json())
        .then(json => setUser(json));
    }, [refreshPostToggle]);

    const refreshPosts = () => {
        setRefreshPostToggle(!refreshPostToggle);
        alert("Posts refreshed");
    };

    function isImage(url) {
        return /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

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
                    <a onClick={refreshPosts}><i className="fa fa-fw fa-sync-alt"></i></a>
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
            <div className='profile_media'>
                {user.posts.map(mediaUrl => (
                    isImage(mediaUrl) ? (
                    <img src={mediaUrl} alt='Post' />
                    ) : (
                    <video controls muted>
                        <source src={mediaUrl} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>
                    )
                ))}
            </div>
        </div>
    </div>
    )
}

export default Profile;
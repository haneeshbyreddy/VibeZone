import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import { useLocation } from 'react-router-dom';

function Profile({ userId, onUserChange }) {
    const [user, setUser] = useState({ name: 'Demo', profileImage: 'None', posts: [] });
    const [usersList, setUsersList] = useState([]);
    const [refreshPostToggle, setRefreshPostToggle] = useState(false);

    useEffect(() => {
        fetch('https://api.vibezone.space/api/getAllUsers')
            .then((response) => response.json())
            .then((data) => {
                setUsersList(data);
            });
    }, []);

    useEffect(() => {
        if (userId) {
            fetch(`https://api.vibezone.space/api/${userId}`)
                .then((data) => data.json())
                .then((json) => setUser(json));
        }
    }, [userId, refreshPostToggle]);

    const refreshPosts = () => {
        setRefreshPostToggle(!refreshPostToggle);
        alert('Posts refreshed');
    };

    function isImage(url) {
        return /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

    const { pathname } = useLocation();

    const handleUserChange = (event) => {
        onUserChange(event.target.value)
    };

    return (
        <div className="wrapper">
            <div className="content">
                <div className="nav">
                    <h1 className="main-heading">VibeZone</h1>
                    <div className="navbar">
                        <Link to={`/${userId}`} className={pathname === '/' ? 'active' : ''}>
                            <i className="fa fa-fw fa-home"></i>
                        </Link>
                        <Link to="#">
                            <i className="fa fa-fw fa-search"></i>
                        </Link>
                        <Link to={`/${userId}/profile`} className={pathname === '/profile' ? 'active' : ''}>
                            <i className="fa fa-fw fa-user"></i>{' '}
                        </Link>
                        <a onClick={refreshPosts}>
                            <i className="fa fa-fw fa-sync-alt"></i>
                        </a>
                    </div>
                </div>
                <select value={userId} onChange={handleUserChange}>
                    {usersList.map((u) => (
                        <option key={u._id} value={u._id}>
                            {u.name}
                        </option>
                    ))}
                </select>
                <div className="divider"></div>
                <div className="profile_info">
                    <div className="profile_stats">
                        <img className="profile_photo" src={user.profileImage} alt="Img" />
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
                <div className="profile_media">
                    {user.posts.reverse().map((mediaUrl) =>
                        isImage(mediaUrl) ? (
                            <a href={mediaUrl}>
                                <img src={mediaUrl} alt="Post" className="profile_media_img" />
                            </a>
                        ) : (
                            <a href={mediaUrl}>
                                <video controls muted className="profile_media_video">
                                    <source src={mediaUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </a>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
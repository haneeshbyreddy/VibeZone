import React from 'react';
import './profile.css';

function Profile({ user }) {

    function isImage(url) {
        return /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

    return (
        <div className="wrapper">
            <div className="content">
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
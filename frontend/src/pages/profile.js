import React from "react";
import './profile.css'
import { useLocation } from "react-router-dom";

function Profile() {
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
        </div>
    </div>
    )
}

export default Profile;
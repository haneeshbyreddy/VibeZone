import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar({ userId, usersList, refreshPosts, onUserChange }) {
  const { pathname } = useLocation();

  return (
    <div className='nav'>
      <h1 className='main-heading'>VibeZone</h1>
      <div className='navbar'>
        <Link to={'/home'} className={pathname === '/home' ? 'active' : ''}>
          <i className='fa fa-fw fa-home'></i>
        </Link>
        <Link to='#'>
          <i className='fa fa-fw fa-search'></i>
        </Link>
        <Link to={'/profile'} className={pathname === '/profile' ? 'active' : ''}>
          <i className='fa fa-fw fa-user'></i>{' '}
        </Link>
        <a onClick={refreshPosts}><i className="fa fa-fw fa-sync-alt"></i></a>
      </div>
        <select value={userId} onChange={(e) => (onUserChange(e.target.value))}>
            {usersList.map((u) => (
                <option key={u._id} value={u._id}>
                    {u.name}
                </option>
            ))}
        </select>
    </div>
  );
}

export default Navbar;

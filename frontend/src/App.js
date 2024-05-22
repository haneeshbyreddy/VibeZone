import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
    const [user, setUser] = useState({ "name": "Demo", "profileImage": "None", "posts": [] });
    const [userId, setUserId] = useState('');
    const [usersList, setUsersList] = useState([]);

    const handleUserIdChange = async (userId) => {
        setUserId(userId)
        await fetch(`http://127.0.0.1:3001/api/${userId}`, { method: 'GET' })
        .then(data => data.json())
        .then(json => setUser(json));
    }

    const refreshPosts = () => {
        handleUserIdChange(userId)
    };

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/getAllUsers')
            .then((response) => response.json())
            .then((data) => {
                setUsersList(data);
            });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={`/login`} />} />
                <Route path="/login" element={<Login onUserChange={handleUserIdChange}/>}/>
                <Route path="/register" element={<Signup/>}/>
                <Route
                    path='/home'
                    element={<Home userId={userId} user={user} usersList={usersList} refreshPosts={refreshPosts} setUser={setUser} onUserChange={handleUserIdChange}/>}
                />
                <Route
                    path='/profile'
                    element={<Profile userId={userId} user={user} usersList={usersList} refreshPosts={refreshPosts} setUser={setUser} onUserChange={handleUserIdChange}/>}
                />
            </Routes>
        </Router>
    )
}
export default App;

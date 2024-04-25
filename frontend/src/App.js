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
    const [userId, setUserId] = useState('661e94247ad53f4fefd1fdf4');
    const [usersList, setUsersList] = useState([]);
    const [refreshPostToggle, setRefreshPostToggle] = useState(false);

    useEffect(() => {
        fetch(`https://api.vibezone.space/api/${userId}`, { method: 'GET' })
        .then(data => data.json())
        .then(json => setUser(json));
    }, [userId, refreshPostToggle]);

    const refreshPosts = () => {
        setRefreshPostToggle(!refreshPostToggle);
    };

    const handleUserChange = (selectedUserId) => {
        setUserId(selectedUserId);
    };

    useEffect(() => {
        fetch('https://api.vibezone.space/api/getAllUsers')
            .then((response) => response.json())
            .then((data) => {
                setUsersList(data);
            });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={`/login`} />} />
                <Route path="/login" element={<Login setUserId={setUserId}/>}/>
                <Route path="/register" element={<Signup/>}/>
                <Route
                    path='/:userId'
                    element={<Home userId={userId} user={user} usersList={usersList} refreshPosts={refreshPosts} setUser={setUser} onUserChange={handleUserChange}/>}
                />
                <Route
                    path='/:userId/profile'
                    element={<Profile userId={userId} user={user} usersList={usersList} refreshPosts={refreshPosts} setUser={setUser} onUserChange={handleUserChange}/>}
                />
            </Routes>
        </Router>
    )
}
export default App;
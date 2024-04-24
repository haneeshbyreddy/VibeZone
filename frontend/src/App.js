import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Navbar from "./components/Navbar";

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
            <Navbar userId={userId} usersList={usersList} refreshPost={refreshPosts} onUserChange={handleUserChange}/>
            <Routes>
                <Route path="/" element={<Navigate to={`/${userId}`} />} />
                <Route
                    path='/:userId'
                    element={<Home userId={userId} user={user} refreshPosts={refreshPosts} setUser={setUser}/>}
                />
                <Route
                    path='/:userId/profile'
                    element={<Profile  user={user} />}
                />
            </Routes>
        </Router>
    )
}
export default App;
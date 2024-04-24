import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
    const [userId, setUserId] = useState('661e94247ad53f4fefd1fdf4');

    const handleUserChange = (selectedUserId) => {
        setUserId(selectedUserId);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={`/${userId}`} />} />
                {/* Pass userId and onUserChange as props to both components */}
                <Route
                    path='/:userId'
                    element={<Home userId={userId} onUserChange={handleUserChange} />}
                />
                <Route
                    path='/:userId/profile'
                    element={<Profile userId={userId} onUserChange={handleUserChange} />}
                />
            </Routes>
        </Router>
    )
}
export default App;
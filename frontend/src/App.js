import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
    const [userId, setUserId] = useState('661e94247ad53f4fefd1fdf4');

    const handleUserChange = (selectedUserId) => {
        setUserId(selectedUserId);
        console.log(selectedUserId)
    };

    return (
        <Router>
            <Routes>
                {/* Pass userId and onUserChange as props to both components */}
                <Route
                    exact
                    path='/'
                    element={<Home userId={userId} onUserChange={handleUserChange} />}
                />
                <Route
                    exact
                    path='/profile'
                    element={<Profile userId={userId} onUserChange={handleUserChange} />}
                />
            </Routes>
        </Router>
    )
}
export default App;
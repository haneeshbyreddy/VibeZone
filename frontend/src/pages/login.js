import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login({ onUserChange }) {    

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://api.vibezone.space/api/login", { name, password })
        .then(result => {
            console.log(result)
            onUserChange(result.data.message)
            navigate('/home')
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                alert("User not found.");
            } else if (err.response && err.response.status === 401) {
                alert("Invalid password.");
            } else {
                alert("An error occurred. Please try again later.");
            }
            console.log(err)
        });
    }


  return (
    <div className="wrapper">
        <div className="content">
            <div className="overlay-container show">
                <div className="popup-box">
                    <h2><center>Login</center></h2>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" 
                            placeholder='Enter Username' 
                            autoComplete='off' 
                            name='username' 
                            className='form-input' 
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input type="password" 
                            placeholder='Enter Password' 
                            name='password' 
                            className='form-input' 
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="form-btn">
                            Login
                        </button>
                    </form>
                    <p>Don't have an account?</p>
                    <Link to="/register">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
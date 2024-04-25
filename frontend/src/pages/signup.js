import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {    

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://api.vibezone.space/api/register", { name, password })
        .then(result => {console.log(result)
        navigate("/login")
        })
        .catch(err => console.log(err))
    }


  return (
    <div className="wrapper">
        <div className="content">
            <div className="overlay-container show">
                <div className="popup-box">
                    <h2><center>Sign Up</center></h2>
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
                            Sign Up
                        </button>
                    </form>
                    <p>Already have an account?</p>
                    <Link to="/login">
                        Login
                    </Link>
               </div>
            </div>
        </div>
    </div>
  );
}
export default Signup;
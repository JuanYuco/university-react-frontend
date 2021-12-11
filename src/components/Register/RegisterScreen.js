import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {

    const handleSubmit = ( e ) => {
        e.preventDefault();
    }

    return (
        <div className="auth__elements">
            <h3>Register</h3>
            <h6><small>!hello! create an account, for this enter your personal information</small></h6>
            <form onSubmit={ handleSubmit }>
                <input 
                    type="text"
                    placeholder="name"
                    name="name"
                    className="form-control"
                />
                <input 
                    type="text"
                    placeholder="last name"
                    name="lastName"
                    className="form-control"
                />
                <input 
                    type="email"
                    placeholder="email"
                    name="email"
                    className="form-control"
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="form-control"
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    className="form-control"
                />
                <button type="submit" className="btn">Sign In</button>
                <Link to="/auth/login">Let's go! log in</Link>
            </form>   
        </div>
    )
}

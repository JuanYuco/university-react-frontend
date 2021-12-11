import React from 'react';
import { Link } from 'react-router-dom';

export const LoginScreen = () => {

    const handleSubmit = ( e ) => {
        e.preventDefault();
    }

    return (
        <div className="auth__elements">
            <h3>Sign In</h3>
            <h6><small>¡Hello! welcome, login to manage university information</small></h6>
            <form onSubmit={ handleSubmit }>
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
                <button type="submit" className="btn">Sign In</button>
                <Link to="/auth/register">Create your account now!</Link>
            </form>   
        </div>
    )
}

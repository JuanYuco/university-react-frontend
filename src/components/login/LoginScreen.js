import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [ { email, password }, handleInputChange ] = useForm({
        email: "",
        password: ""
    });

    const handleSubmit = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( email, password ) );
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
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="form-control"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <button type="submit" className="btn">Sign In</button>
                <Link to="/auth/register">Create your account now!</Link>
            </form>   
        </div>
    )
}

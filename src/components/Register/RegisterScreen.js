import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const [ formValues, handleInputChange ] = useForm({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, lastName, email, password, confirmPassword } = formValues;

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if ( password !== confirmPassword ) {
            Swal.fire("Error", "Las contraseñas no son iguales", "error");
            return;
        }

        dispatch( startRegister({
            name,
            lastName,
            email,
            password
        }));
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
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input 
                    type="text"
                    placeholder="last name"
                    name="lastName"
                    className="form-control"
                    value={ lastName }
                    onChange={ handleInputChange }
                />
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
                <input
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    className="form-control"
                    value={ confirmPassword }
                    onChange={ handleInputChange }
                />
                <button type="submit" className="btn">Register</button>
                <Link to="/auth/login">Let's go! log in</Link>
            </form>   
        </div>
    )
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

export const NavBar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);
    
    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to="/" >University</Link>
            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink 
                        className={ ( { isActive } ) => "nav-item nav-link " + ( ( isActive ) ? 'active' : '' ) }
                        to="/Courses"
                    >
                        Courses
                    </NavLink>
                    <NavLink
                        className={ ( { isActive } ) => "nav-item nav-link " + ( ( isActive ) ? 'active' : '' ) }
                        to="/Instructors"
                    >
                        Instructors
                    </NavLink>
                </div>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">
                        { name }
                    </span>
                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}

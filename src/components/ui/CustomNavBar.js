import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { resetData } from '../../actions/data';

export const CustomNavBar = ({ to, name }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleResetData = ( e ) => {
        const href = e.target.href;
        if ( !href.includes( location.pathname ) ) {
            dispatch( resetData() );
        }
    }

    return (
        <NavLink
            className={  ( { isActive } ) => "nav-item nav-link " + ( ( isActive ) ? 'active' : '' ) }
            to={ to }
            onClick={ handleResetData }
        >
            { name }
        </NavLink>
    )
}

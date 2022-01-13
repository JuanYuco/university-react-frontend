import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { resetData } from '../../actions/data';

export const CustomNavBar = ({ to, name }) => {
    const dispatch = useDispatch();

    const handleResetData = () => {
        dispatch( resetData() );
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

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export const CoursesForm = () => {
    const active = useSelector( state => state.courses.active );
    const [ { CourseID, Title, Credits }, handleInputChange, setFormValues ] = useForm(active);

    useEffect( () => {
        setFormValues( ( values ) => ({ ...values, ...active }) );
    }, [ active, setFormValues ]);

    const titleText = ( active.CourseID ) ? 'Update' : 'Create';
    return (
        <form>
            <h2>{ titleText } Course</h2>
            <h6 className="mb-0">Course ID</h6>
            <input
                type="number"
                className="form-control mb-1"
                name="CourseID"
                value={ CourseID }
                onChange={ handleInputChange }
                required
            />
            <h6 className="mb-0">Title</h6>
            <input
                type="text"
                className="form-control mb-1"
                name="Title"
                value={ Title }
                onChange={ handleInputChange }
                required
            />
            <h6 className="mb-0">Credits</h6>
            <input
                type="number"
                className="form-control mb-1"
                name="Credits"
                value={ Credits }
                onChange={ handleInputChange }
                required
                min="1"
            />
            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                Save
            </button>
        </form>
    )
}
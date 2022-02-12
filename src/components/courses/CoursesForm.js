import React from 'react';
import { startCreateCourse, startUpdateCourse } from '../../actions/courses';
import { useFormSubmit } from '../../hooks/useFormSubmit';

const initalForm = {
    CourseID: '',
    Title: '',
    Credits: ''
};

export const CoursesForm = () => {
    const [ { CourseID, Title, Credits }, handleInputChange, createOrUpdate ] = useFormSubmit( 'CourseID', 'active', initalForm, startCreateCourse, startUpdateCourse );

    const titleText = ( CourseID ) ? 'Update' : 'Create';
    return (
        <form onSubmit={ createOrUpdate }>
            <h2>{ titleText } Course</h2>
            <h6 className="mb-0">Course ID</h6>
            <input
                type="number"
                className="form-control mb-1"
                name="CourseID"
                value={ CourseID }
                onChange={ handleInputChange }
                placeholder="Course ID"
                required
            />
            <h6 className="mb-0">Title</h6>
            <input
                type="text"
                className="form-control mb-1"
                name="Title"
                value={ Title }
                onChange={ handleInputChange }
                placeholder="Title"
                required
            />
            <h6 className="mb-0">Credits</h6>
            <input
                type="number"
                className="form-control mb-1"
                name="Credits"
                value={ Credits }
                onChange={ handleInputChange }
                placeholder="Credits"
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
import React from 'react';
import { useSelector } from 'react-redux';

export const CoursesTable = () => {
    const { loading, courses } = useSelector( state => state.courses );
    if ( loading ) return <h6>...wait</h6>;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Credits</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                   courses.map( ( { CourseID, Title, Credits } ) => (
                        <tr key={ `tr${ CourseID }` }>
                            <td key={ `tdCou${ CourseID }` }>{ CourseID }</td>
                            <td key={ `tdTit${ Title }` }>{ Title }</td>
                            <td key={ `tdCre${ Credits }` }>{ Credits }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

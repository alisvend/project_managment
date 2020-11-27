import React from 'react';
import apiClient from '../services/api';

const Projects = (props) => {
   
    const projectList = props.projects.map((project) =>
        <option value={project.id} key={project.id} >{project.projectName}</option>

    );
    if (props.loggedIn) {
        return (

            <select className="custom-select" onChange={(e) => { props.onChangeProjId(e.target.value) }} >
                <option value={null}>Show Projects</option>{projectList}
            </select>
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Projects;
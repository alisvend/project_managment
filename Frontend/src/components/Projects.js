import React from 'react';
import apiClient from '../services/api';

const Projects = (props) => {

    const projectList = props.projects.map((project) =>
        <option value={project.id} key={project.id} >{project.projectName}</option>

    );
    if (props.loggedIn) {
        if (props.val === null) {
            return (
                
                <select value={null} placeholder="Show Projects" selected className="custom-select" onChange={(e) => { props.onChangeProjId(e.target.value) }} >
                    <option value={null}selected hidden>Show Projects</option>{projectList}
                </select>
        
            );
        }else{ return(
            <select className="custom-select" placeholder="Show Projects" onChange={(e) => { props.onChangeProjId(e.target.value) }} >
                    <option value={null} hidden>Show Projects</option>{projectList}
                </select>
        )
        }
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Projects;
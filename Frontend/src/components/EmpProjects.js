import React from 'react';
import apiClient from '../services/api';

const EmpProjects = (props) => {
    // console.log(props.projects,"projects");
    // console.log(props.projects[0],"projects[0]");

    const projectList = 
    props.projects.map((project) =>
        <option value={project.id} key={project.id} >{project.projectName}</option>

    );
    if (props.loggedIn) {
        if (props.val === null) {
            return (

                <select value={null}selected className="custom-select" onChange={(e) => { props.onChangeProjId(e.target.value) }} >
                    <option value={null}selected >Show Projects</option>{projectList}
                </select>
            );
        }else{ return(
            <select className="custom-select" onChange={(e) => { props.onChangeProjId(e.target.value) }} >
                    <option value={null}>Show Projects</option>{projectList}
                </select>
        )
        }
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default EmpProjects;
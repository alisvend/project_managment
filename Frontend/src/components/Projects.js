import React from 'react';
import apiClient from '../services/api';

const Projects = (props) => {
    const [projects, setProjects] = React.useState([]);
    React.useEffect(() => {
        if (props.loggedIn) {
            apiClient.get('sanctum/csrf-cookie').then(() => apiClient.get('/api/projects')
                .then(response => {
                    setProjects(response.data.data)
                })
                .catch(error => console.error(error)))

        }
    }, []);
    const projectList = projects.map((project) =>
        <option value={project.id} key={project.id} >{project.projectName}</option>

    );
    if (props.loggedIn) {
        return (

            <select className="custom-select" onChange={(e) => { props.onChangeProjId(e.target.value) }} >
                <option value={0}>Show Projects</option>{projectList}
            </select>
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default Projects;
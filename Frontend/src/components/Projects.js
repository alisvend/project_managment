import React from 'react';
import apiClient from '../services/api';

export default class Projects extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                projects: [],
                
    
            };

        }


        fetchProjects() {
                    if (this.props.loggedIn) {
                        apiClient.get('sanctum/csrf-cookie').then(() => apiClient.get('/api/projects')
                            .then(response => {
                                const projects = response.data.data;
                                this.setState({ projects: projects });
                            })
                            .catch(error => console.error(error)
                            ))
            
                    }
                }
                componentDidMount = (props) => {
                    this.fetchProjects();
                }


       
    render(){


        return( <div className="alert alert-warning">You are logged in.</div>);
    }
    }
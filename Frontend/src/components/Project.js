import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Task from './Task';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            milestones:[],
            tasks:[],
        };
    }

    fetchMilestones() {
                if (sessionStorage.getItem('loggedIn')) {
                    apiClient.get('sanctum/csrf-cookie').then(() => apiClient.post('/api/milestones',{projectID:this.props.id})
                        .then(response => {
                            const milestones = response.data;
                            this.setState({ milestones: milestones });
                            
                        })
                        .catch(error => console.error(error)
                        ))
        
                }
            }

            fetchTasks() {
                if (sessionStorage.getItem('loggedIn')) {
                    apiClient.get('sanctum/csrf-cookie').then(() => apiClient.post('/api/tasks',{milestoneID:this.props.id})
                        .then(response => {
                            const tasks = response.data;
                            this.setState({ tasks: tasks });
                            
                        })
                        .catch(error => console.error(error)
                        ))
        
                }
            }

            componentDidMount(){
                console.log(this.props.id);
                this.fetchMilestones();
                
            }


    render(){
      
        return(
<>


<table className="table table-striped tableLeft">
                                <thead className='thead-dark'>
                                    <tr>
                                       
                                        <th colspan="2">Project Name</th>
                                      
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {this.state.milestones.map((milestones) => {
                                        return (
                                            <tr key={milestones.id}>
                                                <td>{milestones.name}</td>
                                                <td ><Task id={milestones.id}/></td>
                                              
                                                </tr>
                                              )})}
                                                </tbody>
                                              </table>
</>



        )
    }
}



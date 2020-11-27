import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Task from './Task';
import NewMilestone from "./NewMilestone";

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }
    handleAddMile = () => {

        this.props.onAddMilestone();
    }

    deleteMilestone=(id)=>{

        window.confirm("Are you sure you want to delete this milestone?")
        apiClient.get('sanctum/csrf-cookie')
        .then(() => apiClient.post('/api/deleteMilestone',{milestone_id:id}));
                           
                   this.props.onDeleteMilestone();      
            
    }

    handleDeleteProject=(id)=>{
        window.confirm("Are you sure you want to delete this project?")
        apiClient.get('sanctum/csrf-cookie')
        .then(() => apiClient.post('/api/deleteProject',{project_id:id}));
                           
                   this.props.onDeleteProject();   

    }
    render() {
        let status = "";
        return (
            <>




                <table className="table table-striped tableLeft">
                    <thead className='thead-dark'>
                        <tr>

                            <th>
                                Project Name
                                 </th>
                            <th>
                                Deadline
                                        </th>
                            <th>
                                Status
                                </th>
                        </tr>

                    </thead>
                    <tbody className="">
                        <tr>



                            {this.props.projects.map((project) => {
                                if (project.id == this.props.projectID) {
                                    console.log(project);
                                    if (project.status == 0) {
                                        status = "In Progress";
                                    } else { status = "Finished"; }

                                    return (<>
                                        <th>
                                            {project.projectName} 
                                        </th>
                                        <th>
                                            {project.deadline}
                                        </th>
                                        <th>
                                            {status} <button onClick={(e)=>{this.handleDeleteProject(this.props.projectID)}}>Delete</button> 
                                        </th></>
                                    );
                                }
                            })}

                                
                        </tr>
                        <tr className='thead-dark'>
                            <th>Milestones</th>
                            <th style={{textAlign:"center"}} colSpan="2">Tasks</th>
                            </tr>
                        {this.props.milestone.map((milestones) => {
                            return (
                                <tr key={milestones.id}>
                                    
                                    <td>{milestones.name}<button onClick={(e)=>{this.deleteMilestone(milestones.id)}}>Delete</button></td>
                                    <td colSpan="2"><Task id={milestones.id} /></td>

                                </tr>
                            )
                        })}
                        <tr><NewMilestone projectID={this.props.projectID} onAddMile={this.handleAddMile} loggedIn={true} /></tr>
                    </tbody>
                </table>
            </>



        )
    }
}



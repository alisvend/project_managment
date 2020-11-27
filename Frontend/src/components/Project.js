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
        if(project.status==0){
           status = "In Progress";
                }else{ status = "Finished";}

        return (<>
            <th>
                {project.projectName}
            </th>
            <th>
                {project.deadline}
            </th>
            <th>
                {status}
        </th></>
        );
    }
})}


</tr>
                        {this.props.milestone.map((milestones) => {
                            return (
                                <tr key={milestones.id}>
                                    <td>{milestones.name}</td>
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



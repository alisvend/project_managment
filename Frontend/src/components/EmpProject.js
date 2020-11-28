import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EmpTask from './EmpTask';
import NewMilestone from "./NewMilestone";
import Projects from './Projects';

export default class EmpProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }

    

    // handleToggleStatus=()=>{
    //     this.props.onToggleStatus();

    // }
  
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
                                            {status} 
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
                                    
                                    <td>{milestones.name}</td>
                                    <td colSpan="2"><EmpTask id={milestones.id} pId={this.props.projectID}  /></td>

                                </tr>
                            )
                        })}
                       
                    </tbody>
                </table>
            </>



        )
    }
}



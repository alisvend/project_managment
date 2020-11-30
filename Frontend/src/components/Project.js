import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Task from './Task';
import NewMilestone from "./NewMilestone";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
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
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete this milestone?',
            buttons: [
              {
                label: 'Yes', onClick:()=>{apiClient.get('sanctum/csrf-cookie')
                .then(() => apiClient.post('/api/deleteMilestone',{milestone_id:id,projectID:this.props.projectID}));
                                   
                           this.props.onDeleteMilestone(); }
              },
              {
                label: 'No'
              }
            ]
          })
        //window.confirm("Are you sure you want to delete this milestone?")
             
            
    }

    handleDeleteProject=(id)=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete this project?',
            buttons: [
              {
                label: 'Yes',onClick:()=>{ apiClient.get('sanctum/csrf-cookie')
                .then(() => apiClient.post('/api/deleteProject',{project_id:id}));
                                   
                           this.props.onDeleteProject();   }
              },
              {
                label: 'No'
              }
            ]
          })
        //window.confirm("Are you sure you want to delete this project?")
       

    }

    handleAddTask=()=>{
        this.handleAddMile();

    }

    handleDeleteTask=()=>{
        this.handleAddMile();

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
                                <th></th>
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
                                        </th>
                                        <th><div className="section">  <span className="trash" onClick={(e)=>{this.handleDeleteProject(this.props.projectID)}}>Delete
                                                                <span></span>
                                                                <i></i>
                                                                </span>
                                                              </div></th></>
                                    );
                                }
                            })}

                                
                        </tr>
                        <tr className='thead-dark'>
                        <th colSpan="2"><div className="plus-milestone"><p>Milestones</p><NewMilestone projectID={this.props.projectID} onAddMile={this.handleAddMile} loggedIn={true} /></div></th>
                            
                            <th style={{textAlign:"left"}} colSpan="2">Tasks</th>
                            </tr>
                        {this.props.milestone.map((milestones) => { let done="card border-left-sec shadow h-100 py-2"
                            if(milestones.status){  done="card border-left-prim shadow h-100 py-2"}
                            return (
                                <tr key={milestones.id}>
                                    
                                  
                                    <td style={{height:"100%"}}colSpan="2">
                                        <div className="col">
                                                <div className={done}>
                                                    <div className="card-body">
                                                        <div className="row no-gutters align-items-center" >
                                                            {/* <div className="col mr-2"> */}
                                                           <div className="col mr-2  m-0 font-weigt-bold text-primary text-uppercase mb-2"> {milestones.name}</div>
                                                           <div className="col mr-2  m-0 font-weigt-bold text-primary text-uppercase mb-2"> {milestones.id}</div>
                                                           <div className="col mr-2   m-0 font-weigt-bold text-primary text-uppercase mb-2"> {milestones.status}</div>
                                                            <div className="col mr-2">
                                                              <div className="section">  <span className="trash" onClick={(e)=>{this.deleteMilestone(milestones.id)}}>Delete
                                                                <span></span>
                                                                <i></i>
                                                                </span>
                                                              </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                </div>
                                        </div>
                                    </td>
                                    <td style={{height:"80px"}} colSpan="2"><div ><Task projectID={this.props.projectID} id={milestones.id} onAddTask={this.handleAddTask} onDeleteTask={this.handleDeleteTask} /></div></td>

                                </tr>
                            )
                        })}
                        <tr></tr>
                    </tbody>
                </table>
            </>



        )
    }
}



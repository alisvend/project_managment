import React from 'react';
import { Redirect } from 'react-router-dom';
import apiClient from '../services/api';
import Projects from './Projects';
import Project from './Project';
import Task from './Task';
import EmpRegister from "./EmployeeForm";
import axios from "axios";
import FormDialog from "./NewProject";
import Issue from "./Issue";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            projectID: null,
            milestones: [],
            addEmp: false,
            navigate: true,
            showIssue:false
        };

    }
    fetchProjects = () => {
        if (sessionStorage.getItem('loggedIn')) {
           apiClient.get('/api/projects')
                .then(response => {
                    this.setState({ projects: response.data.data })
                })
                .catch(error => console.error(error))

        }
    }
    logout = () => {
        axios.post('/logout').then(response => {
            if (response.status === 204) {
                // sessionStorage.setItem('loggedIn', false);
                //   sessionStorage.setItem('role', null);
                sessionStorage.clear();
                this.setState({ navigate: false });

            }
        })
    };
    fetchMilestones() {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.post('/api/milestones', { projectID: this.state.projectID })
                .then(response => {
                    const milestones = response.data;
                    this.setState({ milestones: milestones });

                })
                .catch(error => console.error(error)
                )

        }
    }
    handleAddMile = () => {
       
        this.fetchMilestones();
        this.fetchProjects();
    }
    componentDidMount = () => {
        this.fetchProjects();
    }
    handleAddProj = () => {
        this.fetchProjects();
    }
    handleChangeProj = (id) => {
        this.fetchMilestones();
        this.setState({ projectID: id });
        this.setState({showIssue:false,addEmp:false});
        

    }

    projectexists() {
        console.log(this.state.projectID != null, "result");
        if (this.state.projectID != null) {
            return true;

        }
        else { return false; }

    }
    handleAddEmployee = (e) => {
        this.setState({ projectID: null });
        this.setState({ addEmp: true }); 
        this.setState({showIssue:false})

    }

    handleShowIssue = (e) => {
        this.setState({ projectID: null });
       this.setState({ addEmp: false }); 
        this.setState({showIssue:true})
    }
    handleDeleteProject=(e)=>{

        this.fetchProjects();
        this.fetchMilestones();
    }
    render() {
        if (!this.state.navigate) {
            return <Redirect to="/" />
        }

        if (!sessionStorage.getItem('loggedIn')) {
            return <Redirect to="/" />
        } else {

            return (


                <>

                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3"> Admin </div>
                        </a>


                        <hr className="sidebar-divider my-0"></hr>


                        <li className="nav-item active">
                            <a className="nav-link" href="/adminView">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></a>
                        </li>


                        <hr className="sidebar-divider"></hr>


                        <div className="sidebar-heading">
                            Interface
    </div>


                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className=""></i>
                                {/* <select>Projects</select> */}
                                <Projects onChangeProjId={this.handleChangeProj} val={this.state.projectID} projects={this.state.projects} loggedIn={true} />
                            </a>
                          
                        </li>
                        <li className="nav-item">
                            <a className="nav-link collapsed" onClick={this.handleAddEmployee} data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className=""></i>
                                <span>Add Employee</span>
                            </a>
                            
                        </li>

                        <li className="nav-item">
                            <FormDialog onAddProj={this.handleAddProj} {...this.props} loggedIn={true} />
                        </li>


                        <hr className="sidebar-divider"></hr>


                        <div className="sidebar-heading">
                            Addons
    </div>


                        <li className="nav-item">
                            <a className="nav-link collapsed" onClick={this.handleShowIssue} data-toggle="collapse" data-target="#collapsePages"
                                aria-expanded="true" aria-controls="collapsePages">
                                <i className=""></i>
                                <span>Issues</span>
                            </a>
                           
                        </li>


                        <li className="nav-item">
                            <a className="nav-link" href="charts.html">
                                <i className="fas fa-fw fa-chart-area"></i>
                                <span>Charts</span></a>
                        </li>


                        <li className="nav-item">
                            <a onClick={this.logout} className="nav-link">
                                <i className=""></i>
                                <span>Logout</span></a>
                        </li>


                        <hr className="sidebar-divider d-none d-md-block"></hr>







                    </ul>
                    <div id="content-wrapper" class="d-flex flex-column">


                        <div id="content">


                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>


                                <form
                                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for an issue..."
                                            aria-label="Search" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>


                                <ul className="navbar-nav ml-auto">


                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-search fa-fw"></i>
                                        </a>

                                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                            aria-labelledby="searchDropdown">
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" class="form-control bg-light border-0 small"
                                                        placeholder="Search for..." aria-label="Search"
                                                        aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>


                                  


                                    

                                    <div className="topbar-divider d-none d-sm-block"></div>


                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" >
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{sessionStorage.getItem('username')}</span>
                                            <img className="img-profile rounded-circle"
                                                src="img/profile.png" />
                                        </a>

                                       
                                    </li>

                                </ul>

                            </nav>



                            <div className="container-fluid">
                                {
                                     this.state.showIssue ? (<Issue />) : (<>
                                   { this.projectexists() ? (<Project milestone={this.state.milestones} 
                                        onDeleteProject ={this.handleDeleteProject}
                                        onDeleteMilestone={this.handleAddMile}
                                         onAddMilestone={this.handleAddMile} 
                                         projects={this.state.projects} 
                                         projectID={this.state.projectID} />) : (this.state.addEmp ? (<EmpRegister />) : (<> </>))

                                   }
                                       
                                        </>)
                                }


                            </div>
                        </div>
                    </div> </>



            )
        }

    }

}
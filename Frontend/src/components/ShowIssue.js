import React from 'react';

import apiClient from '../services/api';
import Projects from './Projects';
import Project from './Project';
import Task from './Task';
import EmpRegister from "./EmployeeForm";
import axios from "axios";
import FormDialog from "./NewProject";
import Issue from "./Issue";
import IssueDetails from "./IssueDetails";
import { BrowserRouter as Router,Redirect, Route, Link, NavLink } from 'react-router-dom';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
            navigate: true,
            
        };

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
                            <a className="nav-link" href="index.html">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></a>
                        </li>


                        <hr className="sidebar-divider"></hr>


                        <div className="sidebar-heading">
                          
    </div>


                        
                        

                      


                        


                        <div className="sidebar-heading">
                           
    </div>


                        <li className="nav-item">
                            <a href="/adminView" className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePages"
                                aria-expanded="true" aria-controls="collapsePages">
                                <i className=""></i>
                                <span>Back To Home
                               
                                </span>
                            </a>
                            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Login Screens:</h6>
                                    <a className="collapse-item" href="login.html">Login</a>
                                    <a className="collapse-item" href="register.html">Register</a>
                                    <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                                    <div className="collapse-divider"></div>
                                    <h6 className="collapse-header">Other Pages:</h6>
                                    <a className="collapse-item" href="404.html">404 Page</a>
                                    <a className="collapse-item" href="blank.html">Blank Page</a>
                                </div>
                            </div>
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
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{sessionStorage.getItem('username')}</span>
                                            <img className="img-profile rounded-circle"
                                                src="img/profile.png" />
                                        </a>


                                    </li>

                                </ul>

                            </nav>



                            <div className="container-fluid">
                                {
                                    
                                    <IssueDetails {...this.props} id={this.props.location.state.id} />
                                }


                            </div>
                        </div>
                    </div> </>



            )
        }

    }

}
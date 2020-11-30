import React from "react";
import { Redirect } from "react-router-dom";
import apiClient from "../services/api";
import Projects from "./Projects";
import Project from "./Project";
import Task from "./Task";
import axios from "axios";
import EmpProjects from "./EmpProjects";
import EmpProject from "./EmpProject";
import Issue from "./Issue";

export default class EmpSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      navigate: true,
      projects: [],
      projectID: null,
      milestones: [],
      showIssue:false,
      showProject:true,

    };
  }

  handleViewIssues=()=>{
    if(this.state.showIssue && this.state.showProject)
    {   this.setState({
            showIssue:false,
          
        })
    }
    if(!this.state.showIssue && this.state.showProject){
        this.setState({
        showIssue:true,
        showProject:false,
        })
    }
   
    console.log("showID",this.state.showIssue," , showProject",this.state.showProject)
  }
  handleViewProjects=()=>{
    this.setState({
    showProject:true,
      })
  }
  logout = () => {
    axios.post("/logout").then((response) => {
      if (response.status === 204) {
        this.setState({ navigate: false });
        sessionStorage.setItem("loggedIn", false);
        sessionStorage.setItem("role", null);
      }
    });
  };

  projectexists() {
    if (this.state.projectID != null) {
      return true;
    } else {
      return false;
    }
  }
  fetchProjects = () => {
    if (sessionStorage.getItem("loggedIn")) {
      apiClient.get("sanctum/csrf-cookie").then(() =>
        apiClient
          .get("/api/employeeProjects")
          .then((response) => {
            this.setState({ projects: response.data });
          })
          .catch((error) => console.error(error))
      );
    }
  };

  componentDidMount() {
    this.fetchProjects();
  }

  handleChangeProj = (id) => {
    this.fetchMilestones();
    this.setState({ projectID: id});
  };

  fetchMilestones() {
    if (sessionStorage.getItem("loggedIn")) {
      apiClient.get("sanctum/csrf-cookie").then(() =>
        apiClient
          .post("/api/milestones", { projectID: this.state.projectID })
          .then((response) => {
            const milestones = response.data;
            this.setState({ milestones: milestones });
          })
          .catch((error) => console.error(error))
      );
    }
  }

  handleFetchTask = () => {
    this.fetchProjects();
  };
  render() {
    if (!this.state.navigate) {
      return <Redirect to="/login" />;
    }

    if (!sessionStorage.getItem("loggedIn")) {
      return <Redirect to="/login" />;
    } else {
      let view=null
      if(this.state.showIssue){
      if( this.state.showProject){ 
                  if( this.projectexists()){
                      view= <EmpProject
                      milestone={this.state.milestones}
                      projects={this.state.projects}
                      projectID={this.state.projectID}
                      onToggleStat={this.handleFetchTask}
                    />
                  } 
                  else{
                    view=<Issue />
                  }
              }
              else{
                view=<Issue />
              }
            
      }else{ console.log('showProject',this.state.showProject)
        view= <EmpProject
              milestone={this.state.milestones}
              projects={this.state.projects}
              projectID={this.state.projectID}
              onToggleStat={this.handleFetchTask}
              />
      }
      
      
     
      return (
        <>
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
            >
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
              </div>
              <div className="sidebar-brand-text mx-3">Employee</div>
            </a>

            <hr className="sidebar-divider my-0"></hr>

            <li className="nav-item active">
              <a className="nav-link" href="/employeeView">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <hr className="sidebar-divider"></hr>

            <div className="sidebar-heading"></div>

            <li className="nav-item">
              <a onClick={()=>this.handleViewProjects()}
                className="nav-link collapsed"
               
              >
                <i className=""></i>
                
                <EmpProjects
                  onChangeProjId={this.handleChangeProj}
                  val={this.state.projectID}
                  projects={this.state.projects}
                  loggedIn={true}
                />
              </a>
            </li>
           
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                onClick={()=>this.handleViewIssues()}
                data-toggle="collapse"
                data-target="#collapsePages"
                aria-expanded="true"
                aria-controls="collapsePages"
              >
                <i className=""></i>
                <span>Issues</span>
              </a>
              <div
                id="collapsePages"
                className="collapse"
                aria-labelledby="headingPages"
                data-parent="#accordionSidebar"
              >
                
              </div>
            </li>
            <hr className="sidebar-divider"></hr>
            

            <li className="nav-item">
              <a className="nav-link" onClick={this.logout}>
                <i className=""></i>
                <span>Logout</span>
              </a>
            </li>

            <hr className="sidebar-divider d-none d-md-block"></hr>
          </ul>
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fa fa-search "></i>
                      </button>
                    </div>
                  </div>
                </form>

                <ul className="navbar-nav ml-auto">
                  <div className="topbar-divider d-none d-sm-block"></div>

                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                    >
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">{sessionStorage.getItem('username')}</span>
                                            <img className="img-profile rounded-circle"
                                                src="img/profile.png" />
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="container-fluid">
               {view}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

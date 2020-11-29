import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewTask from './NewTask';


export default class EmpTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            status:false,
        };
    }



    fetchTasks() {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie').then(() => apiClient.post('/api/employeeTasks', { milestoneID: this.props.id })
                .then(response => {
                    const tasks = response.data;
                    this.setState({ tasks: tasks });

                })
                .catch(error => console.error(error)
                ))

        }
    }

    setStatus(stat,taskID){
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie').then(() => apiClient.post('/api/setStatus', {
                 status: stat,
                  id:taskID,
                   milestoneID:this.props.id,
                projectID:this.props.pId })
                
                .catch(error => console.error(error)
                ))

        }



    }

    componentDidMount() {
        this.fetchTasks();
        
    }

    handleInputChange=(event,id)=> {
        
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setStatus(value,id);
        this.fetchTasks();
       // this.props.toggleStatus();

      }


    render() {

        return (
            <div classsName="row">
                {this.state.tasks.map((tasks) => {
                    return (
                        <div className="col">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center" >
                                        {/* <div className="col mr-2"> */}
                                        <div className="col mr-2  m-0 font-weigt-bold text-primary text-uppercase mb-2"> {tasks.taskName}</div>
                                        {/* <div className="col mr-2  m-0 font-weigt-bold text-primary text-uppercase mb-2"> {tasks.employee.name}</div> */}
                                        <div className="col mr-2   m-0 font-weigt-bold text-primary text-uppercase mb-2"> {tasks.percentage}</div>
                                        <div className="col mr-2">
                                        <input
            name="status"
            type="checkbox"
            checked={tasks.status}
            onChange={(e)=>{this.handleInputChange(e,tasks.id)} }/>
                                        </div>
                                    </div> </div></div>
                        </div>
                    )
                })}

                
            </div>



        )
    }
}



import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks:[],
        };
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
             this.fetchTasks();  
            }
handleDeleteTask=(id)=>{
    apiClient.get('sanctum/csrf-cookie')
    .then(() => apiClient.post('/api/deleteTask',{taskId:id}));
                       
          this.fetchTasks();             
        
                
}

    render(){
      
        return(
<div style={{display:"flex", flexDirection:"column"}}>
{this.state.tasks.map((tasks) => {
                                        return (
                                            <>
                                            <div>{tasks.taskName}
                                                {tasks.employee.name}
                                                {tasks.percentage}
                                                <button onClick={()=>{this.handleDeleteTask(tasks.id)}}>Delete</button>
                                             </div>
                                           </>
                                              )})}

<button>Add</button>
</div>



        )
    }
}



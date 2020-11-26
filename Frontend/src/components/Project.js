import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            milestones:[],

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

            componentDidMount(){
                console.log(this.props.id);
                this.fetchMilestones();
            }


    render(){
      
        return(
<>
</>



        )
    }
}



import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Redirect, Route, Link, NavLink } from 'react-router-dom';
import NewReply from './NewReply';
import NewIssue from './NewIssue';
import Replies from './Replies';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


export default class IssueDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            replies: [],
        };
    }

    fetchIssues() {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie').then(() => apiClient.post('/api/getIssueByID', { id: this.props.id })
                .then(response => {
                    const issues = response.data;
                    this.setState({ issues: issues });

                })
                .catch(error => console.error(error)
                ))

        }
    }

    fetchReplies() {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie').then(() => apiClient.post('/api/getReplies', { id: this.props.id })
                .then(response => {
                    const replies = response.data;
                    this.setState({ replies: replies });

                })
                .catch(error => console.error(error)
                ))

        }
    }

    componentDidMount() {

        this.fetchIssues();
        this.fetchReplies();
    }
    deleteIssue = (id) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete this issue?',
            buttons: [
                {
                    label: 'Yes', onClick: () => {
                        apiClient.get('sanctum/csrf-cookie')
                        .then(() => apiClient.post('/api/deleteIssue', { issue_id: id }));

                        this.props.history.push('/adminView')
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    deleteReply = (id) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to delete this reply?',
            buttons: [
                {
                    label: 'Yes', onClick: () => {
                        apiClient.get('sanctum/csrf-cookie')
                        .then(() => apiClient.post('/api/deleteReply', { reply_id: id }));
                        this.fetchReplies();

                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    fetchAddReply=()=>{

        this.fetchReplies();
    }



    render() {
        console.log(this.state.issues, "anything");
        return (<>
            <NavLink to="/adminView">Back To Home</NavLink>

            {this.state.issues.map((issues) => {
                return (
                    <>
                        <div><h3>{issues.title}</h3></div>
                        <div> <div className="shadow" >
                            <button onClick={() => { this.deleteIssue(issues.id) }}>Delete</button>
                            {/* <div><h3>{this.state.issues.user.name}:</h3></div> */}

                            <div><p>{issues.issue}</p></div>
                            <NewReply onAddReply={this.fetchAddReply} id={issues.id} />
                            {this.state.replies.map((replies) => {
                                return (
                                    <div key={replies.id}> <h3>{replies.user.name}</h3><p>{replies.reply}</p><button onClick={() => { this.deleteReply(replies.id) }}>Delete Reply</button></div>)
                            })}</div>
                        </div></>)
            })}

        </>

        )
    }
}



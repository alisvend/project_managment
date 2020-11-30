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

                        if (sessionStorage.getItem('role') === 'admin') { this.props.history.push('/adminView') }
                        else if (sessionStorage.getItem('role') === 'employee') { this.props.history.push('/employeeView') }
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

    fetchAddReply = () => {

        this.fetchReplies();
    }



    render() {
        let formatter = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        });
        console.log(this.state.issues, "anything");
        return (<>


            {this.state.issues.map((issues) => {
                return (
                    <>
                        <div><h1 className="h2 mb-4 text-gray-800">{issues.title}</h1></div>
                        <div> <div className="issue-style card body shadow mb-4 shadow  h-100 py-2" >

                            {/* <div><h3>{this.state.issues.user.name}:</h3></div> */}
                            <div className="title-header card-header py-1">
                                <div> <div style={{ display: "flex", flexDirection: "row" }}> <p>{formatter.format(Date.parse(issues.created_at))}</p>&nbsp;&nbsp;By&nbsp;&nbsp;<p>{issues.user.name}</p></div>
                                </div></div>
                            <div className="issue-body"><p>{issues.issue}</p></div>
                            <div className="side-btns"><button className="delete-issue btn btn-danger btn-icon-split" onClick={() => { this.deleteIssue(issues.id) }}><span className="text">Delete Issue</span></button>
                                <NewReply onAddReply={this.fetchAddReply} id={issues.id} /></div>
                        </div>

                            {this.state.replies.map((replies) => {
                                return (
                                    <div className="card body border-left-secondary reply-body">
                                        <div key={replies.id}> <h3>{replies.user.name}</h3><p>{replies.reply}</p>
                                            <button className="delete-reply btn btn-danger btn-icon-split" onClick={() => { this.deleteReply(replies.id) }}><span className="text">Delete Reply</span></button></div></div>)

                            })}

                        </div></>)
            })}

        </>

        )
    }
}



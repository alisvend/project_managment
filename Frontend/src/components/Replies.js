import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewTask from './NewTask';
import NewIssue from './NewIssue';

export default class Replies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issueID:null,
           replies:[]
        };
    }
    fetchReplies(id) {
        if (sessionStorage.getItem('loggedIn')) {
             apiClient.post('/api/getReplies',{id:id})
                .then(response => {
                    const replies = response.data;
                    this.setState({ replies: replies });

                })
                .catch(error => console.error(error)
                )

        }
    }
    
componentDidMount(){
    this.setState({issueID:this.props.id})
    this.fetchReplies(this.state.issueID);
    console.log(this.props.id);
}
render(){
console.log(this.props,"props");
return(


<div>    {this.state.replies.map((replies)=>{return (<div key={replies.id}> <h3>{replies.user.name}</h3><p>{replies.reply}</p></div>);})}</div>


)




}





}
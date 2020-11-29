import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewTask from './NewTask';
import NewIssue from './NewIssue';
import Replies from './Replies';
export default class Issue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            replies:[],
            issueID:null
        };
    }


    fetchIssues() {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie').then(() => apiClient.get('/api/issues')
                .then(response => {
                    const issues = response.data;
                    this.setState({ issues: issues });

                })
                .catch(error => console.error(error)
                ))

        }
    }

   

    componentDidMount() {

        this.fetchIssues();
       
    }
    getmereplies=(e)=>{
        e.preventDefault();
        this.setState({
            issueID:e.target.id
        })
      
        console.log(e.target.id)
    }

    render() {
        console.log(this.state.replies,"replies");
        return (<>

            <div><NewIssue /></div>
            <div classsName="row">

                {this.state.issues.map((issues) => {
                    let reply=0;
                    if(this.state.issueID==issues.id){reply=issues.id}
                    
                    return (<div className="shadow" >
                    <div><h3>{issues.user.name}:</h3></div>
                       <div><h3>{issues.title}</h3></div>
                       <div><p>{issues.issue}</p></div>
                       <Link to={{ pathname: `/ShowIssue`, state: { id: issues.id } }}> Show Issue</Link>
                       
                       {/* <div>{issues.reply.map((replies)=>{return(<><div>{replies.user_reply.name}</div><div>{replies.reply}</div></>);})}</div> */}
                       <Replies id={reply}/>
                 </div>  );

                 
                })}

            </div>
        </>

        )
    }
}



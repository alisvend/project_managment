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

    handleAddIssue=()=>{

        this.fetchIssues();
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
        let formatter = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          });
        return (<>

            <div><NewIssue onAddIssue={this.handleAddIssue} /></div>
            <div classsName="row">

                {this.state.issues.map((issues) => {
                    let reply=0;
                    if(this.state.issueID==issues.id){reply=issues.id}
                    
                    return (<div className="issue-style card body border-bottom-primary shadow  h-100 py-2" >
                       <div className="card-header py-1">
                    <div><h3>{issues.title}</h3></div>
                    <div style={{display:"flex",flexDirection:"row"}}> <p>{formatter.format(Date.parse(issues.created_at))}</p>&nbsp;&nbsp;By&nbsp;&nbsp;<p>{issues.user.name}</p></div>
                       </div>
                       <div className="card-body">
                        <p>{issues.issue}</p>
                        </div>
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



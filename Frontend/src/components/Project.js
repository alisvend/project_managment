import React from 'react';
import apiClient from '../services/api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Task from './Task';
import NewMilestone from "./NewMilestone";

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }
    handleAddMile = () => {

        this.props.onAddMilestone();
    }
    render() {

        return (
            <>


                <table className="table table-striped tableLeft">
                    <thead className='thead-dark'>
                        <tr>

                            <th colSpan="2">Project Name</th>

                        </tr>
                    </thead>
                    <tbody className="">
                        {this.props.milestone.map((milestones) => {
                            return (
                                <tr key={milestones.id}>
                                    <td>{milestones.name}</td>
                                    <td ><Task id={milestones.id} /></td>

                                </tr>
                            )
                        })}
                        <tr><NewMilestone projectID={this.props.projectID} onAddMile={this.handleAddMile} loggedIn={true} /></tr>
                    </tbody>
                </table>
            </>



        )
    }
}



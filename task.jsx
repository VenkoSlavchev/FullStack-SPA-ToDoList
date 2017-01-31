"use strict";

import React from 'react';

export default class Task extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleCompleteButton = this.handleCompleteButton.bind(this);
    }
    handleDeleteButton(e){
        e.preventDefault();
        let deleteId = this.props.taskId;
        if(deleteId){
            this.props.onCommentDelete(deleteId)
        }
    }
    handleCompleteButton(){
        let completeId = this.props.taskId;
        if(this.props.taskCompleted == 'false'){
            this.props.onTaskComplete(completeId)
        }

    }
    render() {
        return (
                <li className="task-sections" data-id={this.props.taskId} data-completed={this.props.taskCompleted}>
                    <div className="task-icon" onClick={this.handleCompleteButton}></div>
                    <span className="task-text">{this.props.taskMessage}</span>
                    <a className="delete-task-button" onClick={this.handleDeleteButton} href="#">x</a>
                </li>
        )
    }
}

Task.propTypes = {
    taskMessage: React.PropTypes.string.isRequired,
    taskCompleted: React.PropTypes.node.isRequired,
    taskId:React.PropTypes.number.isRequired,
    onCommentDelete:React.PropTypes.func,
    onTaskComplete:React.PropTypes.func
};

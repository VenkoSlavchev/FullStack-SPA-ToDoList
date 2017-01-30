"use strict";

import React from 'react';

export default class Task extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }
    handleDeleteButton(e){
        e.preventDefault();
        let deleteId = this.props.taskId;
        if(deleteId){
            this.props.onCommentDelete(deleteId)
        }

    }
    render() {
        return (
                <li className="task-sections" data-id={this.props.taskId} data-completed={this.props.taskCompleted}>
                    <img className="task-icon"/>
                    <span className="task-text">{this.props.taskMessage}</span>
                    <a className="delete-task-button" onClick={this.handleDeleteButton} href="#">X</a>
                </li>
        )
    }
}

Task.propTypes = {
    taskMessage: React.PropTypes.string.isRequired,
    taskCompleted: React.PropTypes.node.isRequired,
    taskId:React.PropTypes.number.isRequired,
    onCommentDelete:React.PropTypes.func
};

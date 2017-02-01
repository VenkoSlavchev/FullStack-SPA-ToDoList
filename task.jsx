"use strict";
//Task component represents every one of the tasks we add in To Do List
//You can delete task when click on the red cross and
// complete task when click over the empty circle near the task
//Once the task is completed you can't uncomplete it but only to delete it
import React from 'react';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleCompleteButton = this.handleCompleteButton.bind(this);
    }

    handleDeleteButton(e) {
        e.preventDefault();
        let deleteId = this.props.taskId;
        if (deleteId) {
            this.props.onTaskDelete(deleteId)
        }
    }

    handleCompleteButton() {
        let completeId = this.props.taskId;
        // additional check in order to prevent sending requests for completing for already completed tasks
        if (this.props.taskCompleted == 'false') {
            this.props.onTaskComplete(completeId)
        }

    }

    render() {
        return (
            <li className="task-sections" data-completed={this.props.taskCompleted}>
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
    taskId: React.PropTypes.number.isRequired,
    onTaskDelete: React.PropTypes.func,
    onTaskComplete: React.PropTypes.func
};

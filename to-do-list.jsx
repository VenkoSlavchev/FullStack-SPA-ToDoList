"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './task-list';
import TaskForm from './taks-form';
import TaskFilterSection from './task-filter-section';
import $ from 'jquery';


class TaskBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
         this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
         this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
         this.handleDeleteTasks= this.handleDeleteTasks.bind(this);
    }
    loadTasksFromServer() {
    $.ajax({
        method:'GET',
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function (data) {
            this.setState({ data: data });

        }.bind(this),
        error: function (xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
    }
    handleDeleteTasks(taskID){
        $.ajax({
            url: this.props.url + "/" + taskID,
            method: 'DELETE',
            success: function (data) {
                console.log( data );
                this.loadTasksFromServer();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    handleTaskSubmit(taskMessage){
        $.ajax({
            method: 'POST',
            url: this.props.url,
            dataType: 'json',
            data: taskMessage,
            success: function (newComment) {
                console.log(newComment.status);
                let newComments = this.state.data.concat([newComment]);
                this.setState({ data: newComments });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    componentDidMount() {
    this.loadTasksFromServer();
    }

    render() {
        return (
            <section className="sections main-section">
                <TaskForm onTaskSubmit={this.handleTaskSubmit}/>
                <TaskList data={this.state.data} onCommentDelete={this.handleDeleteTasks} />
                <TaskFilterSection />
            </section>
        )
    }

}

TaskBox.propTypes = {
    url: React.PropTypes.string.isRequired
};


ReactDOM.render(<TaskBox url="/api/tasks"/>,
    document.getElementById('container'));
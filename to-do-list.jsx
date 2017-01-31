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
            data: [],
            filterValue:''
        };
         this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
         this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
         this.handleDeleteTasks= this.handleDeleteTasks.bind(this);
         this.handleTaskComplete= this.handleTaskComplete.bind(this);
         this.filterTasks =  this.filterTasks.bind(this);
    }
    loadTasksFromServer() {
    $.ajax({
        method:'GET',
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function (data) {
            this.setState({ data: data });
            this.filterTasks(this.state.filterValue);
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
    }
    handleDeleteTasks(taskID){
        $.ajax({
            url: this.props.url + `/${taskID}`,
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
    handleTaskComplete(completeId){
        $.ajax({
            method: 'PUT',
            url: this.props.url + `/${completeId}`,
            dataType: 'json',
            success: function (updatedComment) {
                console.log(updatedComment);
                console.log(this.state.value);
                this.loadTasksFromServer();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    filterTasks(buttonValue) {
        let completedTasks = $("ul").find("[data-completed=true]");
        let uncompletedTasks = $("ul").find("[data-completed=false]");
        switch (buttonValue) {
            case 'Active':
                completedTasks.hide();
                uncompletedTasks.show();
                this.setState({filterValue:'Active'});
                break;
            case 'Completed':
                uncompletedTasks.hide();
                completedTasks.show();
                this.setState({filterValue:'Completed'});
                break;
            case 'All':
                uncompletedTasks.show();
                completedTasks.show();
                this.setState({filterValue:'All'});
                break;
        }
    }

    componentDidMount() {
    this.loadTasksFromServer();
    }


    render() {
        return (
            <section className="sections main-section">
                <TaskForm onTaskSubmit={this.handleTaskSubmit} />
                <TaskList data={this.state.data} onCommentDelete={this.handleDeleteTasks}
                          onTaskComplete={this.handleTaskComplete}/>
                <TaskFilterSection onFilterTasks={this.filterTasks}/>
            </section>
        )
    }

}

TaskBox.propTypes = {
    url: React.PropTypes.string.isRequired
};


ReactDOM.render(<TaskBox url="/api/tasks"/>,
    document.getElementById('container'));
"use strict";
//To Do List is main Component that gathers all the parts. It's role is to keep the state
// and to do the main work in the application. It only parses the data that is needed to his own components
// and keep them stateless in order for the best practices and keeping them clean and simple.
// Here are made the ajax requests and the filtering
import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './task-list-section';
import TaskForm from './taks-form-section';
import TaskFilterSection from './task-filter-section';
import $ from 'jquery';


class TaskBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filterValue: ''
        };
        //bind all the methods here because it is good practice and in order to use the context
        // of the class inside of it's methods
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleTaskComplete = this.handleTaskComplete.bind(this);
        this.tasksFilter = this.tasksFilter.bind(this);
    }

    loadTasksFromServer() {
        $.ajax({
            method: 'GET',
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data: data});
                this.tasksFilter(this.state.filterValue);
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handleTaskDelete(taskID) {
        $.ajax({
            url: this.props.url + `/${taskID}`,
            method: 'DELETE',
            success: (data) => {
                console.log(data);
                this.loadTasksFromServer();
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handleTaskSubmit(taskMessage) {
        $.ajax({
            method: 'POST',
            url: this.props.url,
            dataType: 'json',
            data: taskMessage,
            success: (newComment) => {
                console.log(newComment.status);
                let newComments = this.state.data.concat([newComment]);
                this.setState({data: newComments});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handleTaskComplete(completeId) {
        $.ajax({
            method: 'PUT',
            url: this.props.url + `/${completeId}`,
            dataType: 'json',
            success: (updatedComment) => {
                console.log(updatedComment.status);
                this.loadTasksFromServer();
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    tasksFilter(buttonValue) {
        let completedTasks = $("ul").find("[data-completed=true]");
        let uncompletedTasks = $("ul").find("[data-completed=false]");
        switch (buttonValue) {
            case 'Active':
                completedTasks.hide();
                uncompletedTasks.show();
                this.setState({filterValue: 'Active'});
                break;
            case 'Completed':
                uncompletedTasks.hide();
                completedTasks.show();
                this.setState({filterValue: 'Completed'});
                break;
            case 'All':
                uncompletedTasks.show();
                completedTasks.show();
                this.setState({filterValue: 'All'});
                break;
        }
    }

    componentDidMount() {
        this.loadTasksFromServer();
    }


    render() {
        return (
            <section className="main-section">
                <TaskForm onTaskSubmit={this.handleTaskSubmit}/>
                <TaskList data={this.state.data} onTaskDelete={this.handleTaskDelete}
                          onTaskComplete={this.handleTaskComplete}/>
                <TaskFilterSection onFilterTasks={this.tasksFilter}/>
            </section>
        )
    }

}

TaskBox.propTypes = {
    url: React.PropTypes.string.isRequired
};

ReactDOM.render(<TaskBox url="/api/tasks"/>,
    document.getElementById('container'));
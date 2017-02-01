"use strict";
//Task form is a Component where you can type the text for your new task and send it to the server
//by pressing enter key when you are done.
import React from 'react';


export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateTask = this.handleCreateTask.bind(this);
    }

    handleCreateTask(e) {
        //doesn't allow you to send empty task
        if (e.keyCode == 13 && e.target.value !== '') {
            this.props.onTaskSubmit({message: e.target.value});
            e.target.value = '';
        }
    }

    render() {
        return (
            <div className="input-section">
                <img className="input-area-icon" src="/public/images/arrow-down-gray.png"/>
                <input type="text" className="input-area-text" placeholder='What needs to be done?'
                       onKeyDown={this.handleCreateTask}/>
            </div>
        )
    }
}

TaskForm.propTypes = {
    onTaskSubmit: React.PropTypes.func
};

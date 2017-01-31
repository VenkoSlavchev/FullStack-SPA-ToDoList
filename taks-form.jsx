"use strict";

import React from 'react';
//import $ from 'jquery';

export default class TaskForm extends React.Component{
    constructor(props){
        super(props);
        this.handleCreateTask = this.handleCreateTask.bind(this);
    }
    handleCreateTask(e){
        if(e.keyCode == 13 && e.target.value!== ''){
            this.props.onTaskSubmit({message: e.target.value});
            e.target.value='';
        }
    }
    render() {
        return (
            <div className="input-section">
                <img className="input-area-icon" src="/public/images/arrow-down-gray.png" onClick={this.handleCreateTask}/>
                <input type="text" className="input-area" placeholder='What needs to be done?' onKeyDown={this.handleCreateTask}/>
            </div>
        )
    }
}

TaskForm.propTypes = {
    onTaskSubmit: React.PropTypes.func
};

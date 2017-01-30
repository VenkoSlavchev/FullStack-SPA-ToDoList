"use strict";

import React from 'react';
//import $ from 'jquery';

export default class TaskForm extends React.Component{
    constructor(props){
        super(props);
        this.handleCreateTask = this.handleCreateTask.bind(this);
    }
    handleCreateTask(e){
        if(e.keyCode == 13){
            this.props.onTaskSubmit({message: e.target.value});
            e.target.value='';
        }
    }
    render() {
        return (
            <div className="input-section">
                <span className="input-area-icon"><img src="/public/images/Arrow-Down-icon.png"/></span>
                <input type="text" className="input-area" placeholder='What needs to be done?' onKeyDown={this.handleCreateTask}/>
            </div>
        )
    }
}

TaskForm.propTypes = {
    onTaskSubmit: React.PropTypes.func
};

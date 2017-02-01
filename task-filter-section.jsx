"use strict";
//Task Filter Section is component that holds an uncompleted tasks counter and filter buttons
//Counter and filtering are only based on property data-completed that every task has and it has been made that because
// it is faster to just control display property instead of sending requests and then render
import React from 'react';
import $ from 'jquery';

export default class TaskFilterSection extends React.Component {
    constructor(props) {
        super(props);
        this.filterTasks = this.filterTasks.bind(this);
    }

    static calculateUncompletedTasks() {
        let tasksNumber = $("ul").find("[data-completed=false]").length;
        if (tasksNumber == 1) {
            return `${tasksNumber} item`;
        } else {
            return `${tasksNumber} items`;
        }
    }

    filterTasks(e) {
        let buttonValue = e.target.value;
        this.props.onFilterTasks(buttonValue)
    }

    render() {
        return (
            <div className="filter-section">
                <span className="task-counter-field">{TaskFilterSection.calculateUncompletedTasks()} left</span>
                <input className="buttons" type="button" value="All" onClick={this.filterTasks}/>
                <input className="buttons" type="button" value="Active" onClick={this.filterTasks}/>
                <input className="buttons" type="button" value="Completed" onClick={this.filterTasks}/>
            </div>
        )
    }
}
TaskFilterSection.propTypes = {
    onFilterTasks: React.PropTypes.func
};


"use strict";

import React from 'react';
import $ from 'jquery';

export default class TaskFilterSection extends React.Component{
    constructor(props){
        super(props);
        this.filterTasks = this.filterTasks.bind(this);
    }
    static calculateUncompletedTasks(){
        return $("ul").find("[data-completed=false]").length
    }
   filterTasks(e){
        let buttonValue = e.target.value;
        this.props.onFilterTasks(buttonValue)
   }

    render() {
        return (
            <div className="sections filter-section">
                <span className="task-counter-field" >{TaskFilterSection.calculateUncompletedTasks()} items left</span>
                <input className="buttons" type="button" value="All" onClick={this.filterTasks}/>
                <input className="buttons" type="button" value="Active" onClick={this.filterTasks}/>
                <input className="buttons" type="button" value="Completed" onClick={this.filterTasks}/>
            </div>
        )
    }
}
TaskFilterSection.propTypes = {
    onFilterTasks:React.PropTypes.func
};


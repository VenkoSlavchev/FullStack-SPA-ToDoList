"use strict";

import React from 'react';
import $ from 'jquery';

export default class TaskFilterSection extends React.Component{
    constructor(props){
        super(props);
    }
    static calculateUncompletedTasks(){
        return $("ul").find("[data-completed=false]").length
    }
    static filterTasks(e){
        let buttonValue = e.target.value;
        const completedTasks = $("ul").find("[data-completed=true]");
        const uncompletedTasks = $("ul").find("[data-completed=false]");
        switch (buttonValue){
            case 'Active':
                uncompletedTasks.show();
                completedTasks.hide();
                break;
            case 'Completed':
                uncompletedTasks.hide();
                completedTasks.show();
                break;
            case 'All':
                uncompletedTasks.show();
                completedTasks.show();
                break;
        }
    }
    render() {
        return (
            <div className="sections filter-section">
                <span className="task-counter-field" >{TaskFilterSection.calculateUncompletedTasks()} items left</span>
                <input className="buttons" type="button" value="All" onClick={TaskFilterSection.filterTasks}/>
                <input className="buttons" type="button" value="Active" onClick={TaskFilterSection.filterTasks}/>
                <input className="buttons" type="button" value="Completed" onClick={TaskFilterSection.filterTasks}/>
            </div>
        )
    }
}

TaskFilterSection.propTypes = {

};

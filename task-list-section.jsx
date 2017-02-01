"use strict";
//Task List is component where all the tasks are filled with the data from the DB and then
// added to the Task List Component
import React from 'react';
import Task from './task';


class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let taskNodes = this.props.data.map((task) => {
            return (
                <Task key={task.id} taskId={task.id}
                      taskMessage={task.message} taskCompleted={task.completed}
                      onTaskDelete={this.props.onTaskDelete}
                      onTaskComplete={this.props.onTaskComplete}>
                </Task>
            )
        });
        return (
            <ul className="list-of-tasks">
                {taskNodes}
            </ul>
        )
    }
}

TaskList.propTypes = {
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            taskId: React.PropTypes.number,
            taskMessage: React.PropTypes.string,
            taskCompleted: React.PropTypes.string
        })
    ),
    onTaskDelete: React.PropTypes.func,
    onTaskComplete: React.PropTypes.func
};
export default TaskList;
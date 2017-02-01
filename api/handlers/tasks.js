'use strict';
//Execute query for getting all tasks
exports.getTasks = function (request, reply) {
    const query = 'SELECT * FROM tasks';

    this.db.all(query, (err, results) => {

        if (err) {
            throw err;
        }
        reply(results);
    });
};
//Execute query to create a task
exports.createTask = function (request, reply) {

    const query = 'INSERT INTO tasks (message,completed) VALUES (?, ?)';
    let genId;
    this.db.run(query, [
            request.payload.message,
            'false'
        ],
        function(err) {
            if (err) {
                throw err;
            }
            genId = this.lastID;
            reply({
                status : `Task with id ${genId} was created`,
                id:genId,
                message: request.payload.message,
                completed:'false'
            }).code(201);
        });
};
//Execute query to delete a task
exports.deleteTask = function (request, reply) {

    const query = 'DELETE FROM tasks WHERE id = ?';

    this.db.run(query, [request.params.taskId],
        (err) => {

            if (err) {
                throw err;
            }

            reply({
                status: `Task with id = ${request.params.taskId} was deleted`
            });
        });
};
//Execute query to make task's property completed equal to true
exports.completeTask = function (request, reply) {

    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';

    this.db.run(query, [
        'true',
        request.params.taskId
    ],
        (err) => {

            if (err) {
                throw err;
            }

            reply({
                status: `Task with id ${request.params.taskId} was completed`
            });
        });
};


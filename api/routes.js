'use strict';
//Routes are validated through Joi object available on Hapi
const Joi = require('joi');
const Tasks = require('./handlers/tasks');

module.exports = [{
    method: 'GET',
    path: '/api/tasks',
    handler: Tasks.getTasks
    }, {
        method: 'POST',
        path: '/api/tasks',
        config: {
            validate: {
                payload: Joi.object({
                    message: Joi.string().min(2).required()
                })
            }
        },
        handler: Tasks.createTask
    }, {
        method: 'DELETE',
        path: '/api/tasks/{taskId}',
        config: {
            validate: {
                params: {
                    taskId: Joi.number().integer().min(1).required()
                }
            }
        },
        handler: Tasks.deleteTask
    }, {
        method: 'PUT',
        path: '/api/tasks/{taskId}',
        config: {
            validate: {
                params: {
                    taskId: Joi.number().integer().min(1).required()
                }
            }
        },
        handler: Tasks.completeTask
    }];
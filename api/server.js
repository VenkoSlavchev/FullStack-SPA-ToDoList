'use strict';

let path = require('path');
const fs = require('fs');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');
const Sqlite3 = require('sqlite3');
const routes = require('./routes');


// Initialize DB
const DB_FILE = __dirname + './data/ToDoList.db';
const db = new Sqlite3.Database(DB_FILE);

// Create Hapi server
const server = new Hapi.Server();

server.connection({port: 9000});

server.bind({ db: db });

// Registering the Good plugin
server.register([{
    register: Good,
    options : {
        reporters : {
            console: [
                {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                },
                {
                    module: 'good-console'
                }, 'stdout']
        }
    }
}],(err) => {

    if (err) {
        throw err;
    }

    // Starting the server
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});

// Registering roots
server.route(routes);
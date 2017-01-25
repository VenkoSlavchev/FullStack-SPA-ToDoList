'use strict';

let path = require('path');
const fs = require('fs');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

const server = new Hapi.Server();
server.connection({port: 9000});
//Register plugins for hapi
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

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});

server.route([{
    method:'GET',
    path: '/api/comments',
    handler: function (request, reply) {
        fs.readFile(COMMENTS_FILE, function (err, data) {
            if(err){
                throw err;
            }
            reply(JSON.parse(data))
        })
    }
}]);
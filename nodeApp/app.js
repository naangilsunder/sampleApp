// Copyright (c) 2016 TekCrew Inc, Cypress, CA. All rights reserved.
// Sundervel 09/10/2016

'use strict';

const Hapi = require('hapi');
const Path = require('path');
const yaml_config = require('node-yaml-config');

const employees = require('./routes/employees.js');
const config = yaml_config.load('./config.yaml');
const logger = require("./utils/logger");


logger.level = config.traceLevel;

logger.info("traceLevel : " + config.traceLevel);

logger.debug("traceLevel : " + config.port);

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: config.port
});

// Add the routes
server.route(employees);

// Start the server
server.start(function(err) {

    if (err) {
		
		logger.error(err);
    }
	
	logger.info('Server connected at port ' + server.info.uri );
});
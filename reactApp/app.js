// Copyright (c) 2016 TekCrew Inc, Cypress, CA. All rights reserved.
// Sundervel 09/10/2016

'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');

const logger = require("./utils/logger");

const app = express();

app.use('/', express.static(__dirname + '/www'));
app.set('port', process.env.PORT || 5000);

app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send(err);
});

	
app.listen(app.get('port'), function () {
    logger.info('React App server listening on port ' + app.get('port'));
});
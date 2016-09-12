// Copyright (c) 2016 TekCrew Inc, Cypress, CA. All rights reserved.
// Sundervel 09/10/2016

// packages
const promise = require('bluebird');
const db = require('monk');
const logger = require("./logger.js");

// project files
const yaml_config = require('node-yaml-config');
const config = yaml_config.load('./config.yaml');
const users = db(config.host + "/" + config.db).get('emp')


function retrieveCommon(query) {

	logger.debug("common/Mongo: Enter retrieveCommon");
		
	//logger.debug("common/Mongo/query" + JSON.stringify(query,null,2 ));

    return new promise(function (fulfill, reject) {

        users.find(query).then(function (data) {

			logger.debug("RetrieveCommon:Record Count : " + data.length );

            fulfill(data);

        }).catch(function (error) {

			logger.error("Error" + error );

            reject(error);

        });
    });
}
function insertCommon(query) {

		logger.debug("Into common/Mongo/insertCommon");
		
		//logger.debug("query" + JSON.stringify(query,null,2 ));

    return new promise(function (fulfill, reject) {

        users.insert(query).then(function (data) {

			logger.debug("insertCommon:Record Count : " + data.length );

            fulfill(data);

        }).catch(function (error) {
			
			logger.error("Error" + error );

            reject(error);

        });
    });
}

exports.retrieveCommon = retrieveCommon;
exports.insertCommon = insertCommon;
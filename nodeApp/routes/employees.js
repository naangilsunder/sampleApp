// Copyright (c) 2016 TekCrew Inc, Cypress, CA. All rights reserved.
// Sundervel 09/10/2016

'use strict';
const Joi = require('joi');
var openMongoCode = require('../utils/mongodb.js');
const logger = require("../utils/logger.js");

var findAll = function (request, reply) {
	
	logger.debug("routes/employees: Enter findAll");

    openMongoCode.retrieveCommon({})
        .then(function (data) {

            return reply(data);

        }).catch(function (error) {
        return reply(error);
    });
};

var findById = function (request, reply) {
	
	logger.debug("routes/employees: Enter findById");
		
    openMongoCode.retrieveCommon({_id: request.params.id})
        .then(function (data) {

            return reply(data);

        }).catch(function (error) {

		logger.error("Error" + error );
				
        return reply(error);
    });
};

var save = function (request, reply) {

	logger.debug("routes/employees: Enter save");

    openMongoCode.insertCommon(request.payload)
        .then(function (data) {

            return reply(data);

        }).catch(function (error) {

		logger.error("Error" + error );
					
        return reply(error);

    });
};
module.exports = [
    {
        method: 'GET',
        path: '/employee/{id}',
        handler: findById

    },
    {
        method: 'GET',
        path: '/employee',
        handler: findAll,
	    config: {
         cors: true
       }

    },  
    {
        method: 'POST',
        path: '/employee',
        handler: save,
        config: {
			 cors: true,
            validate: {
                payload: {
                    firstName: Joi.string().min(1).required(),
                    lastName: Joi.string().min(1).required(),
                    phone: Joi.number().min(1).max(9999999999),
					UserPhoto: Joi.string().min(1).required()
                }
            }

        },

    }
]


'use strict';

var Joi = require('joi');

module.exports.post = {
    body: {
        nome: Joi.string().required().min(2).max(60),
        tipo: Joi.number().required().valid(0, 1)
    },
    params: {
        id: Joi.number().integer()
    }
};

module.exports.get = {
    query: {
        id: Joi.number().integer(),
        nome: Joi.string().max(60),
        limit: Joi.number().integer().min(1).max(25),
        offset: Joi.number().integer().min(0)
    }
};

module.exports.delete = {
    params: {
        id: Joi.number().integer()
    }
};
'use strict';

var Joi = require('joi');

module.exports.post = {
    body: {
        nome: Joi.string().required().max(150),
        email: Joi.string().required().email().max(150),
        senha: Joi.string().required().max(30),
        situacao: Joi.number().valid([0, 1]).default(0)
    }
};

module.exports.token = {
    body: {
        senha: Joi.string().required().max(30),
        email: Joi.string().required().email().max(150)
    }
};
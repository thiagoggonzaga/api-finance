'use strict';

var Joi = require('joi');

module.exports.post = {
    body: {
        nome: Joi.string().required().max(150).label('Nome'),
        email: Joi.string().required().email().max(150).label('E-mail'),
        senha: Joi.string().required().max(30).label('Senha'),
        situacao: Joi.number().valid([0, 1]).default(0).label('Situação')
    }
};

module.exports.token = {
    body: {
        senha: Joi.string().required().max(30).label('Senha'),
        email: Joi.string().required().email().max(150).label('E-mail')
    }
};
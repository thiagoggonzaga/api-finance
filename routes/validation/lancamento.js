'use strict';

var Joi = require('joi');

module.exports.post = {
    body: {
        descricao: Joi.string().required().max(150),
        tipo: Joi.number().required().valid(0, 1).default(0),
        cod_conta: Joi.number().required().min(1),
        cod_categoria: Joi.number().required().min(1),
        data_emissao: Joi.string().min(10).max(10).regex(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/),
        data_vencimento: Joi.string().min(10).max(10).regex(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/).required()
    },
    params: {
        id: Joi.number().integer()
    }
};

module.exports.get = {
    query: {
        id: Joi.number().integer().min(1),
        descricao: Joi.string().max(60),
        cod_conta: Joi.number().min(1),
        cod_categoria: Joi.number().min(1),
        tipo: Joi.number().valid(0, 1),
        limit: Joi.number().integer().min(1).max(25),
        offset: Joi.number().integer().min(0)
    }
};

module.exports.delete = {
    params: {
        id: Joi.number().integer()
    }
};
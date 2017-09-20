var bodyParser = require('body-parser');
var express = require('express');
var expressValidator = require('express-validation');
var morgan = require('morgan');
var cors = require('cors');
var compression = require('compression');
var helmet = require('helmet');
var logger = require('./logger.js');
var i18n = require("i18n");
var Joi = require('joi');

module.exports = app => {
    app.set("port", app.libs.config.port);
    app.set("json spaces", 4);
    app.use(morgan('common', {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    app.use(helmet());
    app.set(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(app.auth.initialize());

    i18n.configure({
        register: global,
        locales: ['pt_BR', 'en'],
        defaultLocale: 'pt_BR',
        directory: __dirname + '/language',
        api: {
            '__': 't',
            '__n': 'tn'
        }
    });
    app.use(i18n.init);

    app.use((req, res, next) => {
        delete req.body.id;
        var opcIdioma = req.headers['accept-language'];

        if (opcIdioma && i18n.getLocales().indexOf(opcIdioma) >= 0) {
            i18n.setLocale(opcIdioma);
            Joi.setDefaultLocale(opcIdioma);
        } else {
            i18n.setLocale('pt_BR');
            Joi.setDefaultLocale('pt_BR');
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

        next();
    });

    app.use(express.static('public'));
};
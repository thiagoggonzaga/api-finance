var express = require('express');
var consign = require('consign');

const app = express();

consign({ verbose: false })
	.include('libs/config.js')
	.then('db.js')
	.then('auth.js')
	.then('libs/middlewares.js')
	.then('services')
	.then('routes')
	.then('libs/boot.js')
	.then('libs/language/validator.js')
	.into(app);

module.exports = app;
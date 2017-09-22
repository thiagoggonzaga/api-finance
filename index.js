var express = require('express');
var consign = require('consign');

const app = express();

consign({ verbose: false })
	.include('configs/config.js')
	.then('db.js')
	.then('auth.js')
	.then('configs/middlewares.js')
	.then('services')
	.then('routes')
	.then('configs/language/validator.js')
	.then('configs/boot.js')
	.into(app);

module.exports = app;
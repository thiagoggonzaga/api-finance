var fs = require('fs');
var winston = require('winston');

// Verifica se a pasta existe, se não cria
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: 'app-info',
            level: 'info',
            filename: 'logs/app-info.log',
            maxsize: 1048576,
            maxFiles: 10,
            colorize: false,
            handleExceptions: true,
            json: true
        }),
        new winston.transports.File({
            name: 'app-error',
            level: 'error',
            filename: 'logs/app-error.log',
            maxsize: 1048576,
            maxFiles: 10,
            colorize: false,
            handleExceptions: true,
            json: true
        })        
    ],
    exceptionHandlers: [
        new winston.transports.File({ 
            filename: 'logs/app-exception.log',
            maxsize: 1048576,
            maxFiles: 10,
            colorize: false,
            handleExceptions: true,
            json: true
        })
    ]
});
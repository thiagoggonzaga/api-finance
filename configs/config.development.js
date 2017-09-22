var logger = require('./logger.js');

const maxReturnRows = 50;

module.exports = {
    port: 3000,
    database: 'finance_dev',
    username: 'postgres',
    password: '1234',
    params: {
        host: 'localhost',
        dialect: 'postgres',
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
            underscored: true
        },
        pool: {
            max: 100,
            min: 0,
            idle: 10000
        },
    },
    jwtTokenTime: 0, // Sem tempo de vida 
    jwtSecret: '1em9M!5_O59;W1_H{v/be44_7Y3-bd$Y/(A|$H|8vq/kU;+^]Z',
    jwtSession: { session: false },
    query: {
        getLimit: function(value) {
            var limitRetorno = value || maxReturnRows;
            return limitRetorno > maxReturnRows || limitRetorno <= 0 ? maxReturnRows : limitRetorno;
        },
        offset: 0
    }
};
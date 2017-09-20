var logger = require('./logger.js');

const maxReturnRows = 25;

module.exports = {
    port: 3000,
    database: 'finance',
    username: 'finance_user',
    password: 'th14g02010',
    params: {
        host: 'mysql552.umbler.com',
        dialect: 'mysql',
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
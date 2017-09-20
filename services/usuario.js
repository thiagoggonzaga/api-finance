var tratamentoErro = require('../libs/componentes/tratamentoErros');
var sequelize = require('sequelize');

module.exports = app => {
    const Usuario = app.db.models.Usuario;

    return {
        verifiqueEmailExistente: (email) => {

            return Usuario.findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('email')), 'email_existente']],
                where: {
                    email: email
                }
            }).then((result) => {
                return result[0].dataValues.email_existente > 0;
            });
        }
    }
};
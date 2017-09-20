var tratamentoErro = require('../libs/componentes/tratamentoErros');
var sequelize = require('sequelize');

module.exports = app => {
    const Usuario = app.db.models.Usuario;

    return {
        verifiqueEmailExistente: (email) => {

            return Usuario.count({
                where: {
                    email: email
                }
            }).then((count) => {
                return count > 0;
            });
        }
    }
};
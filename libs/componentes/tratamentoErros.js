var validate = require('express-validation');

module.exports = {

    verifiqueErrosDeValidacao: function (err, req, res, next) {
        // Tratamento de erros
        if (err instanceof validate.ValidationError) {
            var objErros = {
                sucesso: false,
                erros: []
            };

            err.errors.forEach((erro, index) => {
                objErros.erros.push({
                    campo: erro.field[0],
                    mensagens: erro.messages
                })
            });

            return res.status(err.status).json(objErros);
        }

        if (process.env.NODE_ENV !== 'production') {
            return res.status(500).send(err.stack);
        } else {
            return res.status(500);
        }
    }
}
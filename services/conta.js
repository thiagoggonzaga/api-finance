var sequelize = require('sequelize');

module.exports = app => {
    const Conta = app.db.models.Conta;

    return {
        existeContaComMesmoNomeEhTipo: (conta) => {

            return Conta.count({
                where: {
                    nome: sequelize.where(sequelize.fn('lower', sequelize.col('nome')), sequelize.fn('lower', conta.nome)),
                    tipo: conta.tipo,
                    cod_usuario: conta.cod_usuario
                }
            }).then((count) => {
                return count > 0;
            });
        }
    }
};
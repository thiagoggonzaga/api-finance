var sequelize = require('sequelize');

module.exports = app => {
    const Lancamento = app.db.models.Lancamento;
    const Conta = app.db.models.Conta;
    const Categoria = app.db.models.Categoria;

    return {
        dadosAssociadosEstaoValidos: (entidade) => {

            return Conta.count({
                where: {
                    codigo: entidade.cod_conta,
                    cod_usuario: entidade.cod_usuario
                }
            }).then((numeroDeContas) => {

                if (numeroDeContas > 0) {
                    return Categoria.count({
                        where: {
                            codigo: entidade.cod_categoria,
                            cod_usuario: entidade.cod_usuario
                        }
                    }).then((numeroDeCategorias) => {

                        if (numeroDeCategorias > 0) {
                            return { sucesso: true };
                        } else {
                            return {
                                sucesso: false,
                                erros: [{
                                    campo: 'cod_categoria',
                                    mensagens: [t('lancamento').categoriaNaoExiste]
                                }]
                            };
                        }
                    });
                } else {
                    return {
                        sucesso: false,
                        erros: [{
                            campo: 'cod_conta',
                            mensagens: [t('lancamento').contaNaoExiste]
                        }]
                    };
                }
            });
        }
    }
};
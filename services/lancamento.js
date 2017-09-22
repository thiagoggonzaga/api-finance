var sequelize = require('sequelize');
var moment = require('moment');

module.exports = app => {
    const Lancamento = app.db.models.Lancamento;
    const Conta = app.db.models.Conta;
    const Categoria = app.db.models.Categoria;

    return {
        dadosAssociadosEstaoValidos: (entidade) => {

            // Data de emissão deve ser menor que a data de vencimento do documento
            if (entidade.dataVencimento && entidade.dataEmissao && moment(entidade.dataVencimento) < moment(entidade.dataEmissao)) {
                return new Promise((resolve, reject) => {
                    resolve({
                        sucesso: false,
                        erros: [{
                            campo: 'data_emissao',
                            mensagens: [t('lancamento').dataEmissaoSuperiorDataVencimento]
                        }, {
                            campo: 'data_vencimento',
                            mensagens: [t('lancamento').dataVencimentoInferiorDataEmissao]
                        }]
                    });
                });
            }

            // Verifica se a conta e a categoria existem
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
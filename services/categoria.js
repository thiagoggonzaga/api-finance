var tratamentoErro = require('../libs/componentes/tratamentoErros');
var sequelize = require('sequelize');

module.exports = app => {
    const Categoria = app.db.models.Categoria;

    return {
        existeCategoriaComMesmoNomeEhTipo: (categoria) => {

            return Categoria.count({
                where: {
                    nome: sequelize.where(sequelize.fn('lower', sequelize.col('nome')), sequelize.fn('lower', categoria.nome)),
                    tipo: categoria.tipo,
                    cod_usuario: categoria.cod_usuario
                }
            }).then((count) => {
                return count > 0;
            });
        },

        categoriaVinculadoLancamento: (codigo, codUsuario) => {
            return app.db.sequelize.query(
                'SELECT COUNT(*) AS TOTAL FROM FNC_CATEGORIA CAT ' +
                'INNER JOIN FNC_LANCAMENTO LANC ON LANC.COD_CATEGORIA = CAT.CODIGO ' +
                'WHERE CAT.CODIGO = ? AND CAT.COD_USUARIO = ?',
                {
                    replacements: [codigo, codUsuario],
                    type: sequelize.QueryTypes.SELECT
                }).then((result) => {
                    return result[0].total > 0;
                });
        }
    }
};
var sequelize = require('sequelize');

module.exports = app => {
    const Categoria = app.db.models.Categoria;
    const ServicoCategoria = app.services.categoria;
    const config = app.configs.config;

    var listarCategorias = (req, res) => {
        let limit = config.query.getLimit(req.query.limit);
        let offset = req.query.offset || config.query.offset;

        Categoria.findAndCountAll({
            attributes: ['codigo', 'nome', 'tipo'],
            where: {
                nome: sequelize.where(sequelize.fn('lower', sequelize.col('nome')), {
                    $like: sequelize.fn('lower', '%' + (req.query.nome || '') + '%')
                }),
                cod_usuario: req.user.codigo
            },
            order: ['nome'],
            limit: limit,
            offset: offset
        }).then(result => {
            res.json({
                total: result.count,
                limit: limit,
                offset: offset,
                data: result.rows
            });
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    };

    var cadastrarCategoria = (req, res) => {
        // Seta o ID do usuário logado para criação da categoria
        req.body.cod_usuario = req.user.codigo;

        ServicoCategoria.existeCategoriaComMesmoNomeEhTipo(req.body).then(categoriaExistente => {

            if (!categoriaExistente) {
                Categoria.create(req.body).then(result => {
                    res.status(201).json(result)
                }).catch(error => {
                    res.status(412).json({ msg: error.message });
                });
            } else {
                res.status(412).json({
                    sucesso: false,
                    mensagem: t('categoria').categoriaExistente
                });
            }
        });

    };

    var obterCategoriaPorCodigo = (req, res) => {
        Categoria.findOne({
            attributes: ['codigo', 'nome', 'tipo'],
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(result => {
            if (result) {
                return res.json(result);
            }
            return res.sendStatus(404);
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    };

    var atualizarCategoria = (req, res) => {

        // Só atualiza um item que exista
        Categoria.count({
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(total => {

            if (total > 0) {
                Categoria.update(req.body, {
                    where: {
                        codigo: req.params.id,
                        cod_usuario: req.user.codigo
                    }
                }).then(function (result) {
                    res.sendStatus(204);
                }).catch(error => {
                    res.status(412).json({ msg: error.message });
                });
            } else {
                res.sendStatus(404);
            }
        });
    };

    var removerCategoria = (req, res) => {

        // Só remove um item que exista
        Categoria.count({
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(total => {

            if (total > 0) {
                ServicoCategoria.categoriaVinculadoLancamento(req.params.id, req.user.codigo).then((possuiVinculo) => {

                    if (!possuiVinculo) {
                        Categoria.destroy({
                            where: {
                                codigo: req.params.id,
                                cod_usuario: req.user.codigo
                            }
                        }).then(result => {
                            return res.sendStatus(204);
                        }).catch(error => {
                            res.status(412).json({ msg: error.message });
                        });
                    } else {
                        res.status(412).json({
                            sucesso: false,
                            mensagem: t('categoria').vinculadaLancamento
                        });
                    }
                });
            } else {
                res.sendStatus(404);
            }
        });
    };

    return {
        listarCategorias,
        cadastrarCategoria,
        obterCategoriaPorCodigo,
        atualizarCategoria,
        removerCategoria
    }
};
var sequelize = require('sequelize');

module.exports = app => {
    const Lancamento = app.db.models.Lancamento;
    const Conta = app.db.models.Conta;
    const Categoria = app.db.models.Categoria;
    const ServicoLancamento = app.services.lancamento;
    const config = app.configs.config;

    var listarLancamentos = (req, res) => {
        let limit = config.query.getLimit(req.query.limit);
        let offset = req.query.offset || config.query.offset;

        let whereConta = {
            cod_usuario: req.user.codigo
        };

        let whereCategoria = {
            cod_usuario: req.user.codigo,
            tipo: {
                $in: req.query.tipo != null ? [req.query.tipo] : [0, 1]
            }
        };

        // Prepara filtro da categoria
        if (req.query.cod_categoria) {
            whereCategoria.codigo = [req.query.cod_categoria];
        }

        // Prepara filtro da conta
        if (req.query.cod_conta) {
            whereConta.codigo = [req.query.cod_conta];
        }

        Lancamento.findAndCountAll({
            attributes: ['codigo', 'descricao', 'valor', 'data_emissao', 'data_vencimento'],
            include: [{
                attributes: ['codigo', 'nome', 'tipo'],
                model: Categoria,
                as: 'categoria',
                required: true,
                where: whereCategoria
            }, {
                attributes: ['codigo', 'nome'],
                model: Conta,
                as: 'conta',
                required: true,
                where: whereConta
            }],
            where: {
                descricao: sequelize.where(sequelize.fn('lower', sequelize.col('descricao')), {
                    $like: sequelize.fn('lower', '%' + (req.query.descricao || '') + '%')
                }),
                cod_usuario: req.user.codigo
            },
            order: [
                ['categoria', 'tipo', 'ASC'],
                ['descricao']
            ],
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

    var cadastrarLancamento = (req, res) => {
        // Seta o ID do usuário logado para criação da lancamento
        req.body.cod_usuario = req.user.codigo;

        // Seta os objetos de data corretamente para inclusão pelo Sequelize
        req.body.dataVencimento = req.body.data_vencimento;
        req.body.dataEmissao = req.body.data_emissao;

        ServicoLancamento.dadosAssociadosEstaoValidos(req.body).then((validacao) => {

            if (validacao.sucesso) {

                Lancamento.create(req.body).then(result => {
                    res.status(201).json(result);
                }).catch(error => {
                    res.status(412).json({ msg: error.message });
                });
            } else {
                res.status(412).json(validacao);
            }
        });
    };

    var obterLancamento = (req, res) => {
        Lancamento.findOne({
            attributes: ['codigo', 'descricao', 'valor', 'data_emissao', 'data_vencimento'],
            include: [{
                attributes: ['codigo', 'nome', 'tipo'],
                model: Categoria,
                as: 'categoria',
                required: true,
                where: {
                    cod_usuario: req.user.codigo
                }
            }, {
                attributes: ['codigo', 'nome'],
                model: Conta,
                as: 'conta',
                required: true,
                where: {
                    cod_usuario: req.user.codigo
                }
            }],
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

    var atualizarLancamento = (req, res) => {
        // Seta o ID do usuário logado para criação da lancamento
        req.body.cod_usuario = req.user.codigo;

        // Seta os objetos de data corretamente para inclusão pelo Sequelize
        req.body.dataVencimento = req.body.data_vencimento;
        req.body.dataEmissao = req.body.data_emissao;

        // Só atualiza um item que exista
        Lancamento.count({
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(total => {

            if (total > 0) {
                ServicoLancamento.dadosAssociadosEstaoValidos(req.body).then((validacao) => {
                    if (validacao.sucesso) {
                        Lancamento.update(req.body, {
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
                        res.status(412).json(validacao);
                    }
                });
            } else {
                res.sendStatus(404);
            }
        });
    };

    var deletarLancamento = (req, res) => {

        // Só remove um item que exista
        Lancamento.count({
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(total => {

            if (total > 0) {
                Lancamento.destroy({
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
                res.sendStatus(404);
            }
        });
    };

    return {
        listarLancamentos,
        cadastrarLancamento,
        obterLancamento,
        atualizarLancamento,
        deletarLancamento
    }
};
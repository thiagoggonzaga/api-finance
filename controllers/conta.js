var sequelize = require('sequelize');

module.exports = app => {
    const Conta = app.db.models.Conta;
    const ServicoConta = app.services.conta;
    const config = app.configs.config;

    var listarContas = (req, res) => {
        let limit = config.query.getLimit(req.query.limit);
        let offset = req.query.offset || config.query.offset;

        Conta.findAndCountAll({
            attributes: ['codigo', 'nome', 'tipo', 'situacao'],
            where: {
                nome: sequelize.where(sequelize.fn('lower', sequelize.col('nome')), {
                    $like: sequelize.fn('lower', '%' + (req.query.nome || '') + '%')
                }),
                cod_usuario: req.user.codigo,
                situacao: req.query.situacao
            },
            order: ['tipo', 'nome'],
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

    var cadastrarConta = (req, res) => {
        // Seta o ID do usuário logado para criação da conta
        req.body.cod_usuario = req.user.codigo;

        ServicoConta.existeContaComMesmoNomeEhTipo(req.body).then(contaExistente => {

            if (!contaExistente) {
                Conta.create(req.body).then(result => {
                    res.json(result)
                }).catch(error => {
                    res.status(412).json({ msg: error.message });
                });
            } else {
                res.status(412).json({
                    sucesso: false,
                    mensagem: t('conta').contaExistente
                });
            }
        });
    };

    var obterConta = (req, res) => {
        Conta.findOne({
            attributes: ['codigo', 'nome', 'tipo', 'situacao'],
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

    var atualizarConta = (req, res) => {
        Conta.update(req.body, {
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(function (result) {
            res.json({
                sucesso: true,
                mensagem: __mf('mensagem.atualizacao', t('label').conta)
            });
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    };

    var removerConta = (req, res) => {

        Conta.destroy({
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(result => {
            return res.json({
                sucesso: true,
                mensagem: __mf('mensagem.exclusao', t('label').conta)
            });
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    };

    return {
        listarContas,
        cadastrarConta,
        obterConta,
        atualizarConta,
        removerConta
    }
};
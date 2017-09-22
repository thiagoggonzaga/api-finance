var validate = require('express-validation');
var vLancamento = require('./validation/lancamento');
var tratamentoErro = require('../componentes/tratamentoErros');
var sequelize = require('sequelize');

module.exports = app => {
    const Lancamento = app.db.models.Lancamento;
    const Conta = app.db.models.Conta;
    const Categoria = app.db.models.Categoria;
    const ServicoLancamento = app.services.lancamento;
    const config = app.configs.config;

    app.route('/lancamento').all(app.auth.authenticate());
    app.route('/lancamento/:id').all(app.auth.authenticate());

    /**
     * @api {get} /lancamento Lista de Lançamentos
     * @apiVersion 1.0.0
     * @apiGroup Lancamento
     * @apiDescription Obtém uma lista de lançamentos do colaborador identificado pelo token.
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Exemplo
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number[1..25]} limit Número máximo de registros para retorno
     * @apiParam (Query Params) {Number} offset Início da leitura dos registros
     * @apiParam (Query Params) {String[60]} descricao Descrição para filtro
     * @apiParam (Query Params) {Number} cod_conta Código da conta relacionada ao lançamento
     * @apiParam (Query Params) {Number} cod_categoria Código da categoria relacionada ao lançamento
     * @apiParam (Query Params) {Number="0 - Despesa", "1 - Receita"} tipo=Todos Tipo de lançamento
     * @apiParamExample {text} Exemplo 
     *      http://api.gerdata.com/lancamento?limit=25&offset=0&descricao=Combustível&tipo=0
     * @apiSuccess {Number} total Total de itens cadastrados
     * @apiSuccess {Number} limit Máximo de itens retornados
     * @apiSuccess {Number} offset Início do cursor para buscar paginadas
     * @apiSuccess {Object[]} data Lista de objetos de Lançamento
     * @apiSuccess {Number} data.codigo Código da Lançamento
     * @apiSuccess {String} data.descricao Descrição do Lançamento
     * @apiSuccess {Number="0 - Despesa", "1 - Receita"} data.tipo Tipo do Lançamento
     * @apiSuccess {String} data.valor Valor do Lançamento
     * @apiSuccess {String} data.data_emissao Data de emissão do documento referente ao lançamento (ISO 8601)
     * @apiSuccess {String} data.data_vencimento Data de vencimento do Lançamento (ISO 8601)
     * @apiSuccess {Object} data.conta Conta vinculada ao lançamento
     * @apiSuccess {Number} data.conta.codigo Código da conta onde o lançamento está vinculado
     * @apiSuccess {String} data.conta.nome Nome da conta onde o lançamento está vinculado
     * @apiSuccess {Object} data.categoria Categoria vinculada ao lançamento
     * @apiSuccess {Number} data.categoria.codigo Código da categoria vinculada ao Lançamento
     * @apiSuccess {String} data.categoria.nome Nome da categoria vinculada ao Lançamento
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          total: 2, 
     *          limit: 25,
     *          offset: 0,
     *          data: [{
     *              codigo: 1,
     *              descricao: 'Combustível',
     *              valor: 120,15,
     *              data_emissao: '',
     *              data_vencimento: '',
     *              tipo: 0,
     *              conta: {
     *                  codigo: 1,
     *                  nome: 'Conta Corrente'
     *              },
     *              categoria: {
     *                  codigo: 1,
     *                  nome: 'Automóvel'
     *              }
     *          },
     *          {
     *              codigo: 2,
     *              descricao: 'Salário',
     *              valor: 2300,
     *              data_emissao: '',
     *              data_vencimento: '',
     *              tipo: 1,
     *              conta: {
     *                  codigo: 1,
     *                  nome: 'Conta Corrente'
     *              },
     *              'categoria: {
     *                  codigo: 5,
     *                  nome: 'Salário'
     *              }
     *          }]
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get("/lancamento", validate(vLancamento.get), (req, res) => {
        let limit = config.query.getLimit(req.query.limit);
        let offset = req.query.offset || config.query.offset;
        
        let whereConta = {
            cod_usuario: req.user.codigo
        };

        let whereCategoria = {
            cod_usuario: req.user.codigo
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
            attributes: ['codigo', 'descricao', 'valor', 'tipo', 'data_emissao', 'data_vencimento'],
            include: [{
                attributes: ['codigo', 'nome'],
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
                cod_usuario: req.user.codigo,
                tipo: {
                    $in: req.query.tipo != null ? [req.query.tipo] : [0, 1]
                }
            },
            order: ['tipo', 'descricao'],
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
    });

    /**
     * @api {post} /lancamento Cadastro de Lançamentos
     * @apiVersion 1.0.0
     * @apiGroup Lancamento
     * @apiDescription Inserir novos lançamentos para o usuário autenticado pelo token.
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam {String{150}} descricao Descrição do lançamento [Obrigatório]
     * @apiParam {Number="0 - Despesa", "1 - Receita"} tipo=0 Tipo do Lançamento [Obrigatório]
     * @apiParam {Number} valor Valor do lançamento [Obrigatório]
     * @apiParam {Number} data_emissao Data de emissão do documento utilizando o formato ISO 8601 (Javascript)
     * @apiParam {Number} data_vencimento Data de vencimento do documento no formato ISO 8601 [Obrigatório]
     * @apiParam {Number} cod_conta Código da conta para adição do lançamento [Obrigatório]
     * @apiParam {Number} cod_categoria Código da categoria relacionada ao lançamento [Obrigatório]
     * @apiParamExample {json} Exemplo
     *      { 
     *          descricao: 'Restaurante',
     *          tipo: 0,
     *          valor: 13.50,
     *          data_emissao: '2017-05-26',
     *          data_vencimento: '2017-06-10',
     *          cod_conta: 1,
     *          cod_categoria: 1
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          sucesso: true,
     *          codigo: 1
     *      }
     * @apiErrorExample {json} Pré-requisitos não preenchidos
     *      HTTP/1.1 412 Precondition Failed
     *      {
     *          sucesso: false,
     *          erros: [
     *              {
     *                  campo: 'descricao',
     *                  mensagens: [
     *                      'O campo "descricao" deve ser informado'
     *                  ]
     *              }
     *          ]
     *      }
     * @apiErrorExample {json} Categoria Inválida
     *      HTTP/1.1 412
     *      {
     *          sucesso: false,
     *          erros: [
     *              {
     *                  campo: 'cod_categoria',
     *                  mensagens: [
     *                      'Categoria não encontrada para vínculo com o lançamento.'
     *                  ]
     *              }
     *          ]
     *      }
     * @apiErrorExample {json} Conta Inválida
     *      HTTP/1.1 412
     *      {
     *          sucesso: false,
     *          erros: [
     *              {
     *                  campo: 'cod_conta',
     *                  mensagens: [
     *                      'Conta não encontrada para inclusão do lançamento.'
     *                  ]
     *              }
     *          ]
     *      }
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.post('/lancamento', validate(vLancamento.post), function (req, res) {
        // Seta o ID do usuário logado para criação da lancamento
        req.body.cod_usuario = req.user.codigo;

        // Seta os objetos de data corretamente para inclusão pelo Sequelize
        req.body.dataVencimento = req.body.data_vencimento;
        req.body.dataEmissao = req.body.data_emissao;

        ServicoLancamento.dadosAssociadosEstaoValidos(req.body).then((validacao) => {

            if (validacao.sucesso) {

                Lancamento.create(req.body).then(result => {
                    res.json({
                        sucesso: true,
                        codigo: result.codigo
                    });
                }).catch(error => {
                    res.status(412).json({ msg: error.message });
                });
            } else {
                res.status(412).json(validacao);
            }
        });
    });

    /**
     * @api {get} /lancamento/:id Obter lancamento
     * @apiVersion 1.0.0
     * @apiGroup Lancamento
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam {Number} id Código da lancamento [Obrigatório]
     * @apiParamExample {text} Exemplo 
     *      http://api.gerdata.com/lancamento/2
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome da lancamento
     * @apiSuccess {Number="0 - Lancamento Corrente", "1 - Lancamento Poupança", "2 - Cartão de Crédito"} tipo Tipo da lancamento
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação da lancamento
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          'codigo': 2,
     *          'nome': 'Nubank',
     *          'tipo': 2,
     *          'situacao': 0
     *      }
     * @apiErrorExample {json} Lancamento não existe
     *      HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get('/lancamento/:id', validate(vLancamento.delete), (req, res) => {
        Lancamento.findOne({
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
    });

    /**
     * @api {put} /lancamento/:id Atualiza uma Lancamento
     * @apiVersion 1.0.0
     * @apiGroup Lancamento
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number} id Código da lancamento [Obrigatório]
     * @apiParam {String{150}} nome Nome da lancamento [Obrigatório]
     * @apiParam {Number="0 - Lancamento Corrente", "1 - Lancamento Poupança", "2 - Cartão de Crédito"} tipo Tipo da Lancamento [Obrigatório]
     * @apiParam {Number="0 - Ativo", "1 - Inativo"} situacao=0 Situação da lancamento
     * @apiParamExample {text} Url 
     *      http://api.gerdata.com/lancamento/2
     * @apiParamExample {json} Corpo da Requisição
     *      {
     *          'nome': 'Nubank 2',
     *          'tipo': 2,
     *          'situacao': 0
     *      }
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200
     *      {
     *          sucesso: true,
     *          mensagem: 'Lancamento atualizada com sucesso'
     *      }
     * @apiErrorExample {json} Pré-requisitos não preenchidos
     *      HTTP/1.1 412 Precondition Failed
     *      {
     *          sucesso: false,
     *          erros: [
     *              {
     *                  campo: 'nome',
     *                  mensagens: [
     *                      'O campo "Nome" deve ser informado'
     *                  ]
     *              }
     *          ]
     *      }
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.put('/lancamento/:id', validate(vLancamento.post), (req, res) => {
        Lancamento.update(req.body, {
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(function (result) {
            res.json({
                sucesso: true,
                mensagem: __mf('mensagem.atualizacao', t('label').lancamento)
            });
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    });

    /**
     * @api {delete} /lancamento/:id Exclui uma lancamento
     * @apiVersion 1.0.0
     * @apiGroup Lancamento
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number} id Código da lancamento [Obrigatório]
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200
     *      {
     *          sucesso: true,
     *          mensagem: 'Lancamento removida com sucesso'
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.delete('/lancamento/:id', validate(vLancamento.delete), (req, res) => {

        Lancamento.destroy({
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(result => {
            return res.json({
                sucesso: true,
                mensagem: __mf('mensagem.exclusao', t('label').lancamento)
            });
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    });

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
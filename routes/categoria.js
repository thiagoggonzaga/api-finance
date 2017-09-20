var validate = require('express-validation');
var vCategoria = require('./validation/categoria');
var tratamentoErro = require('../libs/componentes/tratamentoErros');
var sequelize = require('sequelize');

module.exports = app => {
    const Categoria = app.db.models.Categoria;
    const ServicoCategoria = app.services.categoria;
    const config = app.libs.config;

    app.route('/categoria').all(app.auth.authenticate());
    app.route('/categoria/:id').all(app.auth.authenticate());

    /**
     * @api {get} /categoria Lista de Categorias
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Exemplo
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number[1..25]} limit Número máximo de registros para retorno
     * @apiParam (Query Params) {Number} offset Início da leitura dos registros
     * @apiParam (Query Params) {String[60]} nome Nome completo/parcial para filtro
     * @apiParamExample {text} Exemplo 
     *      https://api.gerdata.com.br/categoria?limit=25&offset=0&nome=Alimentação
     * @apiSuccess {Number} total Total de itens cadastrados
     * @apiSuccess {Number} limit Máximo de itens retornados
     * @apiSuccess {Number} offset Início do cursor para buscar paginadas
     * @apiSuccess {Object[]} data Lista de objetos da Categoria
     * @apiSuccess {Number} data.codigo Código da Categoria
     * @apiSuccess {String} data.nome Nome da Categoria
     * @apiSuccess {Number="0 - Despesa", "1 - Receita"} data.tipo Tipo da Categoria
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          total: 2, 
     *          limit: 25,
     *          offset: 0,
     *          data: [{
     *              'codigo': 1,
     *              'nome': 'Alimentação',
     *              'tipo': 0
     *          },
     *          {
     *              'codigo': 2,
     *              'nome': 'Salário',
     *              'tipo': 1
     *          }]
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get("/categoria", validate(vCategoria.get), (req, res) => {
        let limit = config.query.getLimit(req.query.limit);
        let offset = req.query.offset || config.query.offset;

        Categoria.findAndCountAll({
            attributes: ['codigo', 'nome', 'tipo'],
            where: {
                nome: sequelize.where(sequelize.fn('lower', sequelize.col('nome')), {
                    $like: sequelize.fn('lower', '%' + (req.query.nome || '')  + '%')
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
    });

    /**
     * @api {post} /categoria Cadastro de Categorias
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam {String{60}} nome Nome da categoria [Obrigatório]
     * @apiParam {Number="0 - Despesa", "1 - Receita"} tipo Tipo da Categoria [Obrigatório]
     * @apiParamExample {json} Exemplo
     *      { 
     *          'nome': 'Transporte',
     *          'tipo': 0
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome da categoria
     * @apiSuccess {Number="0 - Despesa", "1 - Receita"} tipo Tipo da categoria
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          'codigo': 1,
     *          'nome': 'Transporte',
     *          'tipo': 0
     *      }
     * @apiErrorExample {json} Pré-requisitos não preenchidos
     *      HTTP/1.1 412 Precondition Failed
     *      {
     *          sucesso: false,
     *          erros: [
     *              {
     *                  campo: 'nome',
     *                  mensagens: [
     *                      'O campo "Nome" deve ser informado',
     *                      'O campo "Nome" deve conter no mínimo 2 caracteres'
     *                  ]
     *              }
     *          ]
     *      }
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.post('/categoria', validate(vCategoria.post), function (req, res) {
        // Seta o ID do usuário logado para criação da categoria
        req.body.cod_usuario = req.user.codigo;

        ServicoCategoria.existeCategoriaComMesmoNomeEhTipo(req.body).then(categoriaExistente => {

            if (!categoriaExistente) {
                Categoria.create(req.body).then(result => {
                    res.json(result)
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

    });

    /**
     * @api {get} /categoria/:id Obter categoria
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam {Number} id Código da categoria [Obrigatório]
     * @apiParamExample {text} Exemplo 
     *      https://api.gerdata.com.br/categoria/2
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome da Categoria
     * @apiSuccess {Number="0 - Despesa", "1 - Receita"} tipo Tipo da categoria
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          'codigo': 1,
     *          'nome': 'Transporte',
     *          'tipo': 0
     *      }
     * @apiErrorExample {json} Categoria não existe
     *      HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get('/categoria/:id', validate(vCategoria.delete), (req, res) => {
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
    });

    /**
     * @api {put} /categoria/:id Atualiza uma Categoria
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number} id Código da categoria [Obrigatório]
     * @apiParam {String{60}} nome Nome da categoria [Obrigatório]
     * @apiParam {Number="0 - Despesa", "1 - Receita"} tipo Tipo da categoria [Obrigatório]
     * @apiParamExample {text} Url 
     *      https://api.gerdata.com.br/categoria/2
     * @apiParamExample {json} Corpo da Requisição
     *      {
     *          'nome': 'Transporte Escolar',
     *          'tipo': 0
     *      }
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200
     *      {
     *          sucesso: true,
     *          mensagem: 'Categoria atualizada com sucesso'
     *      }
     * @apiErrorExample {json} Pré-requisitos não preenchidos
     *      HTTP/1.1 412 Precondition Failed
     *      {
     *          sucesso: false,
     *          erros: [
     *              {
     *                  campo: 'nome',
     *                  mensagens: [
     *                      'O campo "Nome" deve ser informado',
     *                      'O campo "Nome" deve conter no mínimo 2 caracteres'
     *                  ]
     *              }
     *          ]
     *      }
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.put('/categoria/:id', validate(vCategoria.post), (req, res) => {
        Categoria.update(req.body, {
            where: {
                codigo: req.params.id,
                cod_usuario: req.user.codigo
            }
        }).then(function (result) {
            res.json({
                sucesso: true,
                mensagem: __mf('mensagem.atualizacao', t('label').categoria)
            });
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    });

    /**
     * @api {delete} /categoria/:id Exclui uma categoria
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number} id Código da categoria [Obrigatório]
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200
     *      {
     *          sucesso: true,
     *          mensagem: 'Categoria removida com sucesso'
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.delete('/categoria/:id', validate(vCategoria.delete), (req, res) => {

        ServicoCategoria.categoriaVinculadoLancamento(req.params.id, req.user.codigo).then((possuiVinculo) => {

            if (!possuiVinculo) {
                Categoria.destroy({
                    where: {
                        codigo: req.params.id,
                        cod_usuario: req.user.codigo
                    }
                }).then(result => {
                    return res.json({
                        sucesso: true,
                        mensagem: __mf('mensagem.exclusao', t('label').categoria)
                    });
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
    });

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
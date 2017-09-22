var validate = require('express-validation');
var vCategoria = require('./validation/categoria');
var tratamentoErro = require('../componentes/tratamentoErros');

module.exports = app => {

    // Rotas c/ Autorizações
    app.route('/categoria').all(app.auth.authenticate());
    app.route('/categoria/:id').all(app.auth.authenticate());

    /**
     * @api {get} /categoria Lista de Categorias
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Exemplo
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number[1..25]} limit Número máximo de registros para retorno
     * @apiParam (Query Params) {Number} offset Início da leitura dos registros
     * @apiParam (Query Params) {String[60]} nome Nome completo/parcial para filtro
     * @apiParamExample {text} Exemplo 
     *      http://api.gerdata.com/categoria?limit=25&offset=0&nome=Alimentação
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
     *              codigo: 1,
     *              nome: 'Alimentação',
     *              tipo': 0
     *          },
     *          {
     *              codigo: 2,
     *              nome: 'Salário',
     *              tipo: 1
     *          }]
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get("/categoria", validate(vCategoria.get), app.controllers.categoria.listarCategorias);

    /**
     * @api {post} /categoria Cadastro de Categorias
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam {String{60}} nome Nome da categoria [Obrigatório]
     * @apiParam {Number="0 - Despesa", "1 - Receita"} tipo Tipo da Categoria [Obrigatório]
     * @apiParamExample {json} Exemplo
     *      { 
     *          nome: 'Transporte',
     *          tipo: 0
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome da categoria
     * @apiSuccess {Number="0 - Despesa", "1 - Receita"} tipo Tipo da categoria
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          codigo: 1,
     *          nome: 'Transporte',
     *          tipo: 0
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
    app.post('/categoria', validate(vCategoria.post), app.controllers.categoria.cadastrarCategoria);

    /**
     * @api {get} /categoria/:id Obter categoria
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam {Number} id Código da categoria [Obrigatório]
     * @apiParamExample {text} Exemplo 
     *      http://api.gerdata.com/categoria/2
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome da Categoria
     * @apiSuccess {Number="0 - Despesa", "1 - Receita"} tipo Tipo da categoria
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          codigo: 1,
     *          nome: 'Transporte',
     *          tipo: 0
     *      }
     * @apiErrorExample {json} Categoria não existe
     *      HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get('/categoria/:id', validate(vCategoria.delete), app.controllers.categoria.obterCategoriaPorCodigo);

    /**
     * @api {put} /categoria/:id Atualiza uma Categoria
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiParam (Query Params) {Number} id Código da categoria [Obrigatório]
     * @apiParam {String{60}} nome Nome da categoria [Obrigatório]
     * @apiParam {Number="0 - Despesa", "1 - Receita"} tipo Tipo da categoria [Obrigatório]
     * @apiParamExample {text} Url 
     *      http://api.gerdata.com/categoria/2
     * @apiParamExample {json} Corpo da Requisição
     *      {
     *          nome: 'Transporte Escolar',
     *          tipo: 0
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
    app.put('/categoria/:id', validate(vCategoria.post), app.controllers.categoria.atualizarCategoria);

    /**
     * @api {delete} /categoria/:id Exclui uma categoria
     * @apiVersion 1.0.0
     * @apiGroup Categoria
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
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
    app.delete('/categoria/:id', validate(vCategoria.delete), app.controllers.categoria.removerCategoria);

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
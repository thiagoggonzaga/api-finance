var validate = require('express-validation');
var vConta = require('./validation/conta');
var tratamentoErro = require('../componentes/tratamentoErros');

module.exports = app => {

    // Rotas c/ Autorização
    app.route('/conta').all(app.auth.authenticate());
    app.route('/conta/:id').all(app.auth.authenticate());

    /**
     * @api {get} /conta Lista de Contas
     * @apiVersion 1.0.0
     * @apiGroup Conta
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Exemplo
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf'
     *      }
     * @apiParam (Query Params) {Number[1..25]} limit Número máximo de registros para retorno
     * @apiParam (Query Params) {Number} offset Início da leitura dos registros
     * @apiParam (Query Params) {String[60]} nome Nome completo/parcial para filtro
     * @apiParam (Query Params) {Number="0 - Ativo", "1 - Inativo"} situacao=0 Situação da conta
     * @apiParamExample {text} Exemplo 
     *      http://api.gerdata.com/conta?limit=25&offset=0&nome=Alimentação&situacao=0
     * @apiSuccess {Number} total Total de itens cadastrados
     * @apiSuccess {Number} limit Máximo de itens retornados
     * @apiSuccess {Number} offset Início do cursor para buscar paginadas
     * @apiSuccess {Object[]} data Lista de objetos da Conta
     * @apiSuccess {Number} data.codigo Código da Conta
     * @apiSuccess {String} data.nome Nome da Conta
     * @apiSuccess {Number="0 - Conta Corrente", "1 - Conta Poupança", "2 - Cartão de Crédito"} data.tipo Tipo da Conta
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} data.situacao Situação da conta
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          total: 2, 
     *          limit: 25,
     *          offset: 0,
     *          data: [{
     *              codigo: 1,
     *              nome: 'Banco do Brasil',
     *              tipo: 0,
     *              situacao: 0
     *          },
     *          {
     *              codigo: 2,
     *              nome: 'Nubank',
     *              tipo: 2,
     *              situacao: 0
     *          }]
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get("/conta", validate(vConta.get), app.controllers.conta.listarContas);

    /**
     * @api {post} /conta Cadastro de Contas
     * @apiVersion 1.0.0
     * @apiGroup Conta
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf'
     *      }
     * @apiParam {String{150}} nome Nome da conta [Obrigatório]
     * @apiParam {Number="0 - Conta Corrente", "1 - Conta Poupança", "2 - Cartão de Crédito"} tipo Tipo da Conta [Obrigatório]
     * @apiParamExample {json} Exemplo
     *      { 
     *          nome: 'Banco do Brasil',
     *          tipo: 0
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome da conta
     * @apiSuccess {Number="0 - Conta Corrente", "1 - Conta Poupança", "2 - Cartão de Crédito"} tipo Tipo da conta
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação da conta
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          codigo: 1,
     *          nome: 'Banco do Brasil',
     *          tipo: 0,
     *          situacao: 0
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
    app.post('/conta', validate(vConta.post), app.controllers.conta.cadastrarConta);

    /**
     * @api {get} /conta/:id Obter conta
     * @apiVersion 1.0.0
     * @apiGroup Conta
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf'
     *      }
     * @apiParam {Number} id Código da conta [Obrigatório]
     * @apiParamExample {text} Exemplo 
     *      http://api.gerdata.com/conta/2
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome da conta
     * @apiSuccess {Number="0 - Conta Corrente", "1 - Conta Poupança", "2 - Cartão de Crédito"} tipo Tipo da conta
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação da conta
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          codigo: 2,
     *          nome: 'Nubank',
     *          tipo: 2,
     *          situacao: 0
     *      }
     * @apiErrorExample {json} Conta não existe
     *      HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get('/conta/:id', validate(vConta.delete), app.controllers.conta.obterConta);

    /**
     * @api {put} /conta/:id Atualiza uma Conta
     * @apiVersion 1.0.0
     * @apiGroup Conta
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf'
     *      }
     * @apiParam (Query Params) {Number} id Código da conta [Obrigatório]
     * @apiParam {String{150}} nome Nome da conta [Obrigatório]
     * @apiParam {Number="0 - Conta Corrente", "1 - Conta Poupança", "2 - Cartão de Crédito"} tipo Tipo da Conta [Obrigatório]
     * @apiParam {Number="0 - Ativo", "1 - Inativo"} situacao=0 Situação da conta
     * @apiParamExample {text} Url 
     *      http://api.gerdata.com/conta/2
     * @apiParamExample {json} Corpo da Requisição
     *      {
     *          nome: 'Nubank 2',
     *          tipo: 2,
     *          situacao: 0
     *      }
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200
     *      {
     *          sucesso: true,
     *          mensagem: 'Conta atualizada com sucesso'
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
    app.put('/conta/:id', validate(vConta.post), app.controllers.conta.atualizarConta);

    /**
     * @api {delete} /conta/:id Exclui uma conta
     * @apiVersion 1.0.0
     * @apiGroup Conta
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf'
     *      }
     * @apiParam (Query Params) {Number} id Código da conta [Obrigatório]
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200
     *      {
     *          sucesso: true,
     *          mensagem: 'Conta removida com sucesso'
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.delete('/conta/:id', validate(vConta.delete), app.controllers.conta.removerConta);

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
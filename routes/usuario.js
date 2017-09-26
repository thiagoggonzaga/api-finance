var validate = require('express-validation');
var vUsuario = require('./validation/usuario');
var tratamentoErro = require('../componentes/tratamentoErros');

module.exports = app => {

    /**
     * @api {get} /usuario Exibe usuário autenticado
     * @apiVersion 1.0.0
     * @apiGroup Usuario
     * @apiDescription Obter os dados do usuário a partir do token informado no Header da requisição.
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          Authorization: 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome do usuário
     * @apiSuccess {String} email Email do usuário
     * @apiSuccess {String} dataCadastro Data do cadastro do usuário
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação do usuário
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          codigo: 1,
     *          nome: 'Thiago G. Gonzaga',
     *          email: 'thiago@gerdata.com.br',
     *          dataCadastro: "2017-09-13T23:42:35.000Z",
     *          situacao: 0
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get('/usuario', app.auth.authenticate(), app.controllers.usuario.obterUsuarioLogado);

    /**
     * @api {post} /usuario Cadastra novo usuário
     * @apiVersion 1.0.0
     * @apiGroup Usuario
     * @apiDescription Incluir um novo usuário para uso da API.
     * @apiParam {String} nome Nome do Usuário
     * @apiParam {String} email Email de acesso
     * @apiParam {String} senha Senha para acesso a api
     * @apiParamExample {json} Exemplo
     *      {
     *          nome: 'Thiago G. Gonzaga',
     *          email: 'thiago@gerdata.com.br',
     *          senha: '123456'
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome do usuário
     * @apiSuccess {String} email Email do usuário
     * @apiSuccess {String} dataCadastro Data do cadastro do usuário
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação do usuário
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 201 Created
     *      {
     *          codigo: 1,
     *          nome: 'Thiago G. Gonzaga',
     *          email: 'thiago@gerdata.com.br',
     *          dataCadastro: "2017-09-13T23:42:35.000Z",
     *          situacao: 0
     *      }
     * @apiErrorExample {json} Pré-condição não preenchida
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} E-mail existente
     *      HTTP/1.1 412 Precondition Failed
     *      {
     *          sucesso: false,
     *          mensagem: 'E-mail já está sendo utilizado.'
     *      }
     */
    app.post("/usuario", validate(vUsuario.post), app.controllers.usuario.novoUsuario);

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
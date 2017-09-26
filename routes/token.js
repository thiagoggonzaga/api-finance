var vUsuario = require('./validation/usuario');
var validate = require('express-validation');
var tratamentoErro = require('../componentes/tratamentoErros');

module.exports = app => {
    /**
     * @api {post} /token Token autenticado
     * @apiVersion 1.0.0
     * @apiGroup Credencial
     * @apiDescription Obter um token de autenticação do usuário para consumo dos demais serviços disponibilizados pela API.
     * @apiParam {String} email Email de usuário
     * @apiParam {String} senha Senha de usuário
     * @apiParamExample {json} Exemplo
     *      {
     *          email: 'thiago@gerdata.com.br',
     *          senha: '123456'
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome do usuário
     * @apiSuccess {String} email Email do usuário
     * @apiSuccess {String} dataCadastro Data do cadastro do usuário (ISO 8601)
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação do usuário
     * @apiSuccess {String} token Token do usuário autenticado
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          codigo: '1',
     *          nome: 'Thiago G. Gonzaga',
     *          email: 'thiago@gerdata.com.br',
     *          dataCadastro: "2017-09-13T23:42:35.000Z",
     *          situacao: 0,
     *          token: 'xyz.abc.123.hgf' 
     *      }
     * @apiErrorExample {json} Erro de autenticação
     *      HTTP/1.1 401 Unauthorized
     */
    app.post('/token', validate(vUsuario.token), app.controllers.usuario.solicitarTokenAutorizacao);

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
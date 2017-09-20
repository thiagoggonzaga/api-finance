var jwt = require('jwt-simple');
var vUsuario = require('./validation/usuario');
var validate = require('express-validation');
var tratamentoErro = require('../libs/componentes/tratamentoErros');

module.exports = app => {
    const cfg = app.libs.config;
    const Usuario = app.db.models.Usuario;

    /**
     * @api {post} /token Token autenticado
     * @apiVersion 1.0.0
     * @apiGroup Credencial
     * @apiParam {String} email Email de usuário
     * @apiParam {String} senha Senha de usuário
     * @apiParamExample {json} Exemplo
     *      {
     *          'email': 'thiago@gerdata.com.br',
     *          'senha': '123456'
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome do usuário
     * @apiSuccess {String} email Email do usuário
     * @apiSuccess {String} dataCadastro Data do cadastro do usuário
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação do usuário
     * @apiSuccess {String} token Token do usuário autenticado
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          'codigo': '1',
     *          'nome': 'Thiago G. Gonzaga',
     *          'email': 'thiago@gerdata.com.br',
     *          'dataCadastro': "2017-09-13T23:42:35.000Z",
     *          'situacao': 0,
     *          'token': 'xyz.abc.123.hgf' 
     *      }
     * @apiErrorExample {json} Erro de autenticação
     *      HTTP/1.1 401 Unauthorized
     */
    app.post('/token', validate(vUsuario.token), (req, res) => {

        Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {

            if (Usuario.isPassword(usuario.senha, req.body.senha)) {
                let payload = {
                    codigo: usuario.codigo,
                    data: new Date()
                };

                // Cria o token do usuário logado
                usuario.dataValues.token = jwt.encode(payload, cfg.jwtSecret);

                // Remove a senha do usuário antes de retornar para a view
                delete usuario.dataValues.senha;

                // Retorna os dados dos usuários
                res.json(usuario);
            } else {
                res.sendStatus(401); // Não Autorizado
            }
        }).catch(error => res.sendStatus(401));
    });

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
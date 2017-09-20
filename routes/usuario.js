var validate = require('express-validation');
var vUsuario = require('./validation/usuario');
var tratamentoErro = require('../libs/componentes/tratamentoErros');

module.exports = app => {
    const Usuario = app.db.models.Usuario;
    const ServicoUsuario = app.services.usuario;

    /**
     * @api {get} /usuario Exibe usuário autenticado
     * @apiVersion 1.0.0
     * @apiGroup Usuario
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *      { 
     *          'Authorization': 'JWT xyz.abc.123.hgf' 
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome do usuário
     * @apiSuccess {String} email Email do usuário
     * @apiSuccess {String} dataCadastro Data do cadastro do usuário
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação do usuário
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          'codigo': 1,
     *          'nome': 'Thiago G. Gonzaga',
     *          'email': 'thiago@gerdata.com.br',
     *          'dataCadastro': "2017-09-13T23:42:35.000Z",
     *          'situacao': 0
     *      }
     * @apiErrorExample {json} Erro de consulta
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Usuário não autenticado
     *      HTTP/1.1 401 Unauthorized
     */
    app.get('/usuario', app.auth.authenticate(), (req, res) => {
        Usuario.findById(req.user.codigo, {
            attributes: ["codigo", "nome", "email", "dataCadastro", "situacao"]
        }).then(result => {
            res.json(result)
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    });

    /**
     * @api {post} /usuario Cadastra novo usuário
     * @apiVersion 1.0.0
     * @apiGroup Usuario
     * @apiParam {String} nome Nome do Usuário
     * @apiParam {String} email Email de acesso
     * @apiParam {String} senha Senha para acesso a api
     * @apiParamExample {json} Exemplo
     *      {
     *          'nome': 'Thiago G. Gonzaga',
     *          'email': 'thiago@gerdata.com.br',
     *          'senha': '123456'
     *      }
     * @apiSuccess {Number} codigo Código de registro
     * @apiSuccess {String} nome Nome do usuário
     * @apiSuccess {String} email Email do usuário
     * @apiSuccess {String} dataCadastro Data do cadastro do usuário
     * @apiSuccess {Number="0 - Ativo", "1 - Inativo"} situacao Situação do usuário
     * @apiSuccessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          'codigo': 1,
     *          'nome': 'Thiago G. Gonzaga',
     *          'email': 'thiago@gerdata.com.br',
     *          'dataCadastro': "2017-09-13T23:42:35.000Z",
     *          'situacao': 0
     *      }
     * @apiErrorExample {json} Erro no cadastro
     *      HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} E-mail existente
     *      HTTP/1.1 412 
     *      {
     *          sucesso: false,
     *          mensagem: 'E-mail já está sendo utilizado.'
     *      }
     */
    app.post("/usuario", validate(vUsuario.post), (req, res) => {
        ServicoUsuario.verifiqueEmailExistente(req.body.email).then((emailJaCadastrado) => {

            if (!emailJaCadastrado) {
                Usuario.create(req.body).then(result => {
                    // Remove a senha criptografada por motivos de segurança
                    delete result.dataValues.senha;
                    res.json(result);
                }).catch(error => {
                    res.status(412).json({ msg: error.message });
                });
            } else {
                res.status(412).json({
                    sucesso: false,
                    mensagem: t('usuario').emailEmUso
                });
            }

        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    });

    // Interceptador para retorno das chamadas que possuem erros gerados pelo express-validation
    app.use(tratamentoErro.verifiqueErrosDeValidacao);
};
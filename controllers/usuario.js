var jwt = require('jwt-simple');

module.exports = app => {
    const cfg = app.configs.config;
    const Usuario = app.db.models.Usuario;
    const ServicoUsuario = app.services.usuario;

    var obterUsuarioLogado = (req, res) => {
        Usuario.findById(req.user.codigo, {
            attributes: ["codigo", "nome", "email", "dataCadastro", "situacao"]
        }).then(result => {
            res.json(result)
        }).catch(error => {
            res.status(412).json({ msg: error.message });
        });
    };

    var novoUsuario = (req, res) => {
        ServicoUsuario.verifiqueEmailExistente(req.body.email).then((emailJaCadastrado) => {

            if (!emailJaCadastrado) {
                Usuario.create(req.body).then(result => {
                    // Remove a senha criptografada por motivos de segurança
                    delete result.dataValues.senha;
                    res.status(201).json(result);
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
    };

    var solicitarTokenAutorizacao = (req, res) => {

        Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {

            if (usuario && Usuario.isPassword(usuario.senha, req.body.senha)) {
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
        });
    };

    return {
        obterUsuarioLogado,
        novoUsuario,
        solicitarTokenAutorizacao
    }
};
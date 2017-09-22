var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var moment = require('moment');

module.exports = app => {
    const Usuario = app.db.models.Usuario;
    const cfg = app.configs.config;

    var opts = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    const strategy = new JwtStrategy(opts, function (payload, done) {
        var dataGeracaoToken = moment(payload.data);

        // Se a data de geração do token ultrasar o tempo de vida definido, então outro token deve ser gerado
        if (cfg.jwtTokenTime > 0 && moment() > dataGeracaoToken.add(cfg.jwtTokenTime, 'minutes')) {
            return (done(null, false));
        }

        Usuario.findById(payload.codigo).then(usuario => {
            if (usuario) {
                return done(null, {
                    codigo: usuario.codigo,
                    email: usuario.email
                });
            }
            return done(null, false);
        }).catch(error => {
            done(error, null)
        });
    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
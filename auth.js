var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = app => {
    const Usuario = app.db.models.Usuario;
    const cfg = app.libs.config;

    var opts = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    const strategy = new JwtStrategy(opts, function(payload, done) {
        Usuario.findById(payload.codigo)
        .then(usuario => {
            if (usuario) {
                return done(null, {
                    codigo: usuario.codigo,
                    email: usuario.email
                });
            }
            return done(null, false);
        })
        .catch(error => done(error, null));
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
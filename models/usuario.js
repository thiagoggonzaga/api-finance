var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');

module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define('Usuario', {
        codigo: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'codigo'
        },
        nome: {
            type: DataType.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true
            },
            field: 'nome'
        },
        email: {
            type: DataType.STRING(150),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            field: 'email'
        },
        senha: {
            type: DataType.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            },
            field: 'senha'
        },
        situacao: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'situacao'
        },
        dataCadastro: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            field: 'data_cadastro'
        }
    }, {
        tableName: 'fnc_usuario',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        underscored: true,
        hooks: {
            beforeCreate: usuario => {
                const salt = bcrypt.genSaltSync();
                usuario.senha = bcrypt.hashSync(usuario.senha, salt);
            }
        }
    });

    Usuario.isPassword = (senhaCriptografada, senha) => {
        return bcrypt.compareSync(senha, senhaCriptografada);
    };

    return Usuario;
};
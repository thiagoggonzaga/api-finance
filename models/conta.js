module.exports = (sequelize, DataType) => {
    const Conta = sequelize.define('Conta', {
        codigo: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'codigo',
            allowNull: false
        },
        nome: {
            type: DataType.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true
            },
            field: 'nome'
        },
        tipo: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        situacao: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'situacao'
        }
    }, {
            tableName: 'fnc_conta',
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            underscored: true
        });

    Conta.associate = function (models) {
        Conta.belongsTo(models.Usuario, {
            foreignKey: 'cod_usuario',
            targetKey: 'codigo',
            onUpdate: 'RESTRICT',
            onDelete: 'RESTRICT',
            constraints: true
        });
    }

    return Conta;
};
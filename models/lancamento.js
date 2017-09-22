module.exports = (sequelize, DataType) => {
	const Lancamento = sequelize.define('Lancamento', {
		codigo: {
			type: DataType.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			field: 'codigo'
		},
		descricao: {
			type: DataType.STRING(150),
			allowNull: false,
			validate: {
				notEmpty: true
			},
			field: 'descricao'
		},
		valor: {
			type: DataType.DOUBLE,
			allowNull: false,
			field: 'valor'
		},
		tipo: {
			type: DataType.INTEGER,
			allowNull: false,
			defaultValue: 0,
			field: 'tipo'
		},
		dataEmissao: {
			type: DataType.DATEONLY,
			allowNull: true,
			field: 'data_emissao'
		},
		dataVencimento: {
			type: DataType.DATEONLY,
			allowNull: false,
			field: 'data_vencimento'
		}
	}, {
			tableName: 'fnc_lancamento',
			timestamps: false,
			createdAt: false,
			updatedAt: false,
			underscored: true
		});

	Lancamento.associate = function (models) {
		Lancamento.belongsTo(models.Conta, {
			foreignKey: 'cod_conta',
			targetKey: 'codigo',
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
			constraints: true,
			allowNull: false,
			as: 'conta'
		});

		Lancamento.belongsTo(models.Categoria, {
			foreignKey: 'cod_categoria',
			targetKey: 'codigo',
			onUpdate: 'RESTRICT',
			onDelete: 'RESTRICT',
			constraints: true,
			allowNull: false,
			as: 'categoria'
		});

		Lancamento.belongsTo(models.Usuario, {
			foreignKey: 'cod_usuario',
			targetKey: 'codigo',
			onUpdate: 'RESTRICT',
			onDelete: 'RESTRICT',
			constraints: true,
			allowNull: false,
			as: 'usuario'
		});
	};

	return Lancamento;
};
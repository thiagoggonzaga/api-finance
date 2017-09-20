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
			type: DataType.DATE,
			allowNull: true,
			field: 'data_emissao'
		},
		dataVencimento: {
			type: DataType.DATE,
			allowNull: true,
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
			onUpdate: 'RESTRICT',
			onDelete: 'RESTRICT',
			constraints: true
		});

		Lancamento.belongsTo(models.Categoria, {
			foreignKey: {
				name: 'cod_categoria',
				targetKey: 'codigo',
				onUpdate: 'RESTRICT',
				onDelete: 'RESTRICT',
				constraints: true
			}
		});
	};

	return Lancamento;
};
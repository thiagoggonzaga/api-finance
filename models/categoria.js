module.exports = (sequelize, DataType) => {
	const Categoria = sequelize.define('Categoria', {
		codigo: {
			type: DataType.BIGINT,
			primaryKey: true,
			autoIncrement: true,
			field: 'codigo',
			allowNull: false
		},
		nome: {
			type: DataType.STRING(60),
			allowNull: false,
			validate: {
				notEmpty: true
			},
			field: 'nome'
		},
		tipo: {
			type: DataType.INTEGER,
			allowNull: false,
			defaultValue: 0,
			field: 'tipo'
		}
	},
		{
			tableName: 'fnc_categoria',
			timestamps: false,
			createdAt: false,
			updatedAt: false,
			underscored: true,
			indexes: [{
				unique: true,
				name: 'idx_categoria_nome_tipo_unico',
				fields: ['nome', 'tipo', 'cod_usuario']
			}]
		});

	Categoria.associate = function (models) {
		Categoria.belongsTo(models.Usuario, {
			foreignKey: 'cod_usuario',
			targetKey: 'codigo',
			onUpdate: 'RESTRICT',
			onDelete: 'RESTRICT',
			constraints: true,
			allowNull: false
		});
	};

	return Categoria;
};
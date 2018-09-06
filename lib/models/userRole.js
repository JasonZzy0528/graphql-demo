let UserRole = (sequelize, DataTypes) => {
  let model = sequelize.define('user_role', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
  model.associate = models => {
    // associations can be defined here
    models.userRole.belongsTo(models.role, { foreignKey: 'role_id', targetKey: 'id' })
    models.userRole.belongsTo(models.user, { foreignKey: 'user_id', targetKey: 'id' })
  }
  return model
}

export default UserRole

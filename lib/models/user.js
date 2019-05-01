let User = (sequelize, DataTypes) => {
  let model = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      createdAt: 'created_at',
      freezeTableName: true,
      paranoid: true,
      timestamps: true,
      underscored: true,
      updatedAt: 'updated_at'
    }
  )
  model.associate = models => {
    // associations can be defined here
    models.user.hasMany(models.token, { foreignKey: 'user_id', sourceKey: 'id' })
    models.user.hasMany(models.userRole, { foreignKey: 'user_id', sourceKey: 'id' })
  }
  return model
}

export default User

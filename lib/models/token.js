let Token = (sequelize, DataTypes) => {
  let model = sequelize.define('token', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    expires_at: {
      allowNull: false,
      type: DataTypes.DATE,
      get(val) {
        const expires_at = new Date(this.getDataValue(val))
        return expires_at.getTime()
      }
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      get(val) {
        const created_at = new Date(this.getDataValue(val))
        return created_at.getTime()
      }
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      get(val) {
        const updated_at = new Date(this.getDataValue(val))
        return updated_at.getTime()
      }
    }
  }, {
    createdAt: 'created_at',
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
    underscored: true,
    updatedAt: 'updated_at'
  })
  model.associate = models => {
    // associations can be defined here
    models.token.belongsTo(models.user, { foreignKey: 'user_id', targetKey: 'id' })
  }
  return model
}

export default Token

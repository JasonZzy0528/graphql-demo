let Token = (sequelize, DataTypes) => {
  let model = sequelize.define('token', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    expires_at: {
      allowNull: false,
      type: DataTypes.DATE,
      get(val: string) {
        const expires_at = new Date(this.getDataValue(val))
        return expires_at.getTime()
      }
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      get(val: string) {
        const created_at = new Date(this.getDataValue(val))
        return created_at.getTime()
      }
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      get(val: string) {
        const updated_at = new Date(this.getDataValue(val))
        return updated_at.getTime()
      }
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true
  })
  model.associate = models => {
    // associations can be defined here
    models.token.belongsTo(models.user, { foreignKey: 'user_id', targetKey: 'id' })
  }
  return model
}

export default Token

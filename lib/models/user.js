let User = (sequelize, DataTypes) => {
  return sequelize.define('user', {
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
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true
  })
}

User.associate = models => {
  // associations can be defined here
  models.User.hasMany(models.Token, { 'foreignKey': 'user_id', sourceKey: 'id' })
}

export default User

let Role = (sequelize, DataTypes) => {
  return sequelize.define('role', {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: true
      }
    },
    access_level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: true
      }
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
}

export default Role

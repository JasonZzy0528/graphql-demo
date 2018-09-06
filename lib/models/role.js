import { includes, isArray, some } from 'lodash'
import {
  UserInputError
} from 'apollo-server-express'

let Role = (sequelize, DataTypes) => {
  let model = sequelize.define('role', {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: true
      }
    },
    access_level: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isElementUppercase: value => {
          if (!isArray(value)) {
            throw new UserInputError(`Expect \`Array\` but got \`${typeof value}\` access_level`)
          }
          const expectedValue = ['READ', 'UPDATE', 'CREATE', 'DELETE']
          if (!some(value, el => includes(expectedValue, el))) {
            throw new UserInputError(`Unexpected \`access_level\` ${JSON.stringify(value)}`)
          }
          return true
        }
      }
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
  model.associate = models => {
    // associations can be defined here
    models.role.hasMany(models.userRole, { foreignKey: 'role_id', sourceKey: 'id' })
  }
  return model
}

export default Role

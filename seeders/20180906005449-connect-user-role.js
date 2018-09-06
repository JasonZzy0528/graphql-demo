import models from '../lib/models'

const seed = {
  up: async queryInterface => {
    const user = await models.user.findOne({
      where: {
        username: 'admin'
      }
    })
    const role = await models.role.findOne({
      where: {
        role_name: 'ADMIN'
      }
    })
    return queryInterface.bulkInsert('user_role', [{
      user_id: user.id,
      role_id: role.id
    }])
  },

  down: async queryInterface => {
    const user = await models.user.findOne({
      where: {
        username: 'admin'
      }
    })
    const role = await models.role.findOne({
      where: {
        role_name: 'ADMIN'
      }
    })
    return queryInterface.bulkDelete('user_role', {
      user_id: user.id,
      role_id: role.id
    })
  }
}

export default seed

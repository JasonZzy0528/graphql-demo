import uuid from 'uuid/v4'

const seed = {
  up: queryInterface => {
    return queryInterface.bulkInsert('role', [{
      id: uuid(),
      role_name: 'ADMIN',
      access_level: ['READ', 'CREATE', 'UPDATE', 'DELETE']
    }])
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('role', {
      role_name: 'ADMIN'
    })
  }
}

export default seed

import uuid from 'uuid/v4'
import { encodePassword } from '../lib/utils'

const seed = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('user', [{
      id: uuid(),
      username: 'admin',
      password: await encodePassword('admin'),
      email: 'admin@admin.com',
      created_at: '2018-07-28 13:13:23.273 +00:00',
      updated_at: '2018-07-28 13:13:23.273 +00:00'
    }])
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('user', {
      username: 'admin'
    })
  }
}

export default seed

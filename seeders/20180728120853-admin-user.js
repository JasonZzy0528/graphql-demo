import { encodePassword } from '../lib/utils'

const seed = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('user', [{
      id: '521b3557-959d-4956-9188-4de05e8875da',
      username: 'admin',
      password: await encodePassword('admin'),
      email: 'admin@admin.com',
      created_at: '2018-07-28 13:13:23.273 +00:00',
      updated_at: '2018-07-28 13:13:23.273 +00:00'
    }])
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user', {
      id: '521b3557-959d-4956-9188-4de05e8875da'
    })
  }
}

export default seed

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_role', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      role_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_role')
  }
}

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      role_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      access_level: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('role')
  }
}

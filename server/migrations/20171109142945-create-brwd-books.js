'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('brwdBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      dateBorrowed: {
        type: Sequelize.DATE
      },
      dateToReturn: {
        type: Sequelize.DATE
      },
      brwApproval: {
        type: Sequelize.STRING
      },
      rtnApproval: {
        type: Sequelize.STRING
      },
      returnStatus: {
        type: Sequelize.STRING
      },
      dateReturned: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('brwdBooks');
  }
};
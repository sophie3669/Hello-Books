module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BorrowedBooks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    bookId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      reference: {
        model: 'Users',
        key: 'id',
        as: 'userId',

      },
    },
    borrowedDate: {
      type: Sequelize.DATE,
    },
    returnDate: {
      type: Sequelize.DATE,
    },
    borrowApproval: {
      type: Sequelize.STRING,
    },
    returnApproval: {
      type: Sequelize.STRING,
    },
    returnStatus: {
      type: Sequelize.STRING,
    },
    dateReturned: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('BorrowedBooks'),
};

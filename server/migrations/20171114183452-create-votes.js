module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    bookId: {
      type: Sequelize.INTEGER,
      reference: {
        model: 'Books',
        key: 'id',
        as: 'bookId',
      },

    },
    upVotes: {
      type: Sequelize.INTEGER,
    },
    downVotes: {
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('Votes'),
};

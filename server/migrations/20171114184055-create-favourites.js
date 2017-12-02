module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Favourites', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    bookId: {
      type: Sequelize.INTEGER,
      reference: {
        model: 'Books',
        key: 'id',
        as: 'bookId',
      },

    },
    userId: {
      type: Sequelize.INTEGER,
      reference: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
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
  down: queryInterface => queryInterface.dropTable('Favourites'),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      reference: {
        model: 'Books',
        key: 'id',
        as: 'userId',
      },
    },
    bookName: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    author: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    publishYear: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Books'),
};

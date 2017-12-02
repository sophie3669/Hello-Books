module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Votes.associate = (models) => {
    Votes.belongsTo(models.Books, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });

    Votes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Votes;
};

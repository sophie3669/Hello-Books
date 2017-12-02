export default (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    bookName: DataTypes.STRING,
    description: DataTypes.TEXT,
    author: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    publishYear: DataTypes.STRING,
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  Books.associate = (models) => {
    Books.hasMany(models.Reviews, {
      foreignKey: 'bookId',
    });
  };

  Books.associate = (models) => {
    Books.hasMany(models.Favorites, {
      foreignKey: 'bookId',
    });
  };

  Books.associate = (models) => {
    Books.hasMany(models.Votes, {
      foreignKey: 'bookId',
    });
  };

  Books.associate = (models) => {
    Books.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Books;
};

module.exports = (sequelize, DataTypes) => {
  const Favourites = sequelize.define('Favourites', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  });

  Favourites.associate = (models) => {
    Favourites.belongsTo(models.Books, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
  };

  Favourites.associate = (models) => {
    Favourites.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Favourites;
};

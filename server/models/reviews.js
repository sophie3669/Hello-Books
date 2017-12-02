module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Books, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
  };
  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Reviews;
};

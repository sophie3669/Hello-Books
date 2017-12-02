module.exports = (sequelize, DataTypes) => {
  const ReadingList = sequelize.define('ReadingList', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    target: DataTypes.TEXT,
  });

  ReadingList.associate = (models) => {
    ReadingList.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };


  return ReadingList;
};

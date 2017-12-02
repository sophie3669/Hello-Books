module.exports = (sequelize, DataTypes) => {
  const BorrowedBooks = sequelize.define('BorrowedBooks', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    borrowedDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    borrowApproval: DataTypes.STRING,
    returnApproval: DataTypes.STRING,
    returnStatus: DataTypes.STRING,
    dateReturned: DataTypes.DATE,
  });

  BorrowedBooks.associate = (models) => {
    BorrowedBooks.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return BorrowedBooks;
};

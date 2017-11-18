'use strict';
module.exports = (sequelize, DataTypes) => {
  var BorrowedBooks = sequelize.define('BorrowedBooks', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    borrowedDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    borrowApproval: DataTypes.STRING,
    returnApproval: DataTypes.STRING,
    returnStatus: DataTypes.STRING,
    dateReturned: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BorrowedBooks;
};
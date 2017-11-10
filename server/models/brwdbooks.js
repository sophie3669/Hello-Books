'use strict';
module.exports = (sequelize, DataTypes) => {
  var brwdBooks = sequelize.define('brwdBooks', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    dateBorrowed: DataTypes.DATE,
    dateToReturn: DataTypes.DATE,
    brwApproval: DataTypes.STRING,
    rtnApproval: DataTypes.STRING,
    returnStatus: DataTypes.STRING,
    dateReturned: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return brwdBooks;
};
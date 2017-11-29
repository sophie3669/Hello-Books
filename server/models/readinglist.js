'use strict';
module.exports = (sequelize, DataTypes) => {
  var ReadingList = sequelize.define('ReadingList', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    target: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ReadingList;
};
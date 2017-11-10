'use strict';
module.exports = (sequelize, DataTypes) => {
  var books = sequelize.define('books', {
    bookName: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    publishYear: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return books;
};
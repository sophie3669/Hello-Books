'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    bookName: DataTypes.STRING,
    description: DataTypes.TEXT,
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
  return Books;
};
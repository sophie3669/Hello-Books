'use strict';
module.exports = (sequelize, DataTypes) => {
  var Books = sequelize.define('Books', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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
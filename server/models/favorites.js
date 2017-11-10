'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorites = sequelize.define('favorites', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorites;
};
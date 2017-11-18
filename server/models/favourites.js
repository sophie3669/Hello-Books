'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favourites = sequelize.define('Favourites', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favourites;
};
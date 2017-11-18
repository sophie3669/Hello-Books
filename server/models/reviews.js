'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reviews = sequelize.define('Reviews', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Reviews;
};
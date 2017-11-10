'use strict';
module.exports = (sequelize, DataTypes) => {
  var votes = sequelize.define('votes', {
    bookId: DataTypes.INTEGER,
    upVotes: DataTypes.INTEGER,
    downVotes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return votes;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Votes = sequelize.define('Votes', {
    userId: DataTypes.INTEGER,
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
  return Votes;
};
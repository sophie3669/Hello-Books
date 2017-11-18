'use strict';
module.exports = (sequelize, DataTypes) => {
  var Votes = sequelize.define('Votes', {
    bookId: DataTypes.INTEGER,
    upVotes: DataTypes.STRING,
    downVotes: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Votes;
};
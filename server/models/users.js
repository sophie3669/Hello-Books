module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmPassword: DataTypes.STRING,
    role: DataTypes.INTEGER,
    active: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.Reviews, {
      foreignKey: 'userId',
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.Votes, {
      foreignKey: 'userId',
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.Favourites, {
      foreignKey: 'userId',
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.Books, {
      foreignKey: 'userId',
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.ReadingList, {
      foreignKey: 'userId',
    });
  };

  Users.associate = (models) => {
    Users.hasMany(models.BorrowedBooks, {
      foreignKey: 'userId',
    });
  };
  return Users;
};

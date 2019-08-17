'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define(
    'Quote',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      author: DataTypes.STRING,
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Quote.associate = function(models) {
    // associations can be defined here
  };
  return Quote;
};

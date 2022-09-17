'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.game.hasMany(models.comment)
      models.game.belongsToMany(models.user, {through: "users_games"})
    }
  }
  game.init({
    name: DataTypes.STRING,
    deal: DataTypes.STRING,
    price: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};
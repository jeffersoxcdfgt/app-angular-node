'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  products.init({
    name: {
      allowNull: false,
      type:DataTypes.STRING    
     },
     description: {
      allowNull: false,
      type:DataTypes.STRING    
     },
     price: {
      allowNull: false,
      type:DataTypes.DECIMAL    
     },
     picture: {
      allowNull: false,
      type:DataTypes.STRING    
     },
     cost: {
      allowNull: false,
      type:DataTypes.DECIMAL    
     }
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};
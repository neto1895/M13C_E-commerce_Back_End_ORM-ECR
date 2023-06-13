// import important parts of sequelize library
const { Model, DataTypes, DECIMAL } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: [10, 2], // 10 digits maximum, 2 decimal places maximum
          msg: 'Price must be a valid decimal with a maximum of 10 digits and 2 decimal places.',
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false, // Doesn't allow null values
      defaultValue: 10, // Set a default value of 10
      validate: {
        isNumeric: {
          msg: 'Stock must be a numeric value.', // Validates that the value is numeric
        },
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category', // References the category model's id
        key: 'id',
      },
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

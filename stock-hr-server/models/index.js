// models/index.js
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        logging: false,
    }
);

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = (sequelize) => {
  class Department extends Model {
    static associate(models) {
      // ❌ Comment this if Employee model doesn't exist
      // Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
    }
  }

  Department.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    },
    {
      sequelize,
      modelName: 'Department',
      tableName: 'Departments',
      timestamps: true
    }
  );

  return Department;
};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// ✅ Ensure models associate correctly
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

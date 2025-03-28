'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Department extends Model {
    static associate(models) {
      // ✅ Only include if Employee exists
      if (models.Employee) {
        Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
      }
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

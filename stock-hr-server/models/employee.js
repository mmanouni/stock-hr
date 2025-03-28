'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Employee extends Model {
    static associate(models) {
      // ✅ Define the relationship correctly
      Employee.belongsTo(models.Department, { foreignKey: 'departmentId' });
    }
  }

  Employee.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Employee',
      tableName: 'Employees',
      timestamps: true,
    }
  );

  return Employee;
};

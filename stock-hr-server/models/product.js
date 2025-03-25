const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Model {}

    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            stock_quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps: false,
        }
    );

    return Product;
};


import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/orm.js";

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        usage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "products",
        timestamps: true, // Enable default createdAt and updatedAt columns
    },
);

Product.sync({
    logging: false,
    alter: true,
})
export default Product;

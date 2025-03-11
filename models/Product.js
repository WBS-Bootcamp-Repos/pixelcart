
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
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
            unique: true,
        },
        usage: {
            type: DataTypes.TEXT,
            allowNull: false,
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

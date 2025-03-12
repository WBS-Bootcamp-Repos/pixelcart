
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/orm.js";
import Category from "./Category.js";

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
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id',
            },
            onDelete: 'CASCADE', // If category is deleted, its products should be deleted
        }
    },
    {
        tableName: "products",
        timestamps: true, // Enable default createdAt and updatedAt columns
    },
);

Product.sync({
    logging: false,
    alter: false,
})
export default Product;

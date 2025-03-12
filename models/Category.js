import { DataTypes } from 'sequelize';
import sequelize from '../db/orm.js';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'categories',
    timestamps: true,
});

Category.sync({
    logging: false,
    alter: true,
})

export default Category;

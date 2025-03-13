import { DataTypes } from "sequelize";
import sequelize from "../db/orm.js";

const OrderProduct = sequelize.define("OrderProduct", {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Orders",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Products",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default OrderProduct;

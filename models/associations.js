import User from "./User.js";
import Product from "./Product.js";
import Category from "./Category.js";
import Order from "./Order.js";
import OrderProduct from "./OrderProduct.js"; 
// Define relationships
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

Category.hasMany(Product, { foreignKey: "categoryId", onDelete: "CASCADE" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

Order.belongsToMany(Product, { through: "OrderProducts", foreignKey: "orderId" });
Product.belongsToMany(Order, { through: "OrderProducts", foreignKey: "productId" });

export { User, Product, Category, Order, OrderProduct };

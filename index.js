import "./models/associations.js";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import errorHandler from "./middleware/errorHandler.js";
import orderRouter from './routes/orderRouter.js';
import categoryRoutes from './routes/categoryRoutes.js'
import "./models/associations.js";

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS

// Use the User, Order and Products routes
app.use("/users", userRoutes);
app.use('/orders', orderRouter);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes)

// Error handling middleware (should be last)
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

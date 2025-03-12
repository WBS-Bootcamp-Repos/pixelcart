import express from "express";
import {
    getProducts, createProduct, getProductById, updateProduct, deleteProduct
} from "../controllers/productController.js";
import { validateProduct } from "../middleware/validateRequest.js";

const router = express.Router()

// GET /products - Get all products
router.get("/", getProducts)

// POST /products - Create a new product
router.post("/", validateProduct, createProduct)

// GET /products/:id - Get a product by ID
router.get("/:id", getProductById)

// PUT /products/:id - Update a product by ID
router.put("/:id", updateProduct)

// DELETE /products/:id - Delete a product by ID
router.delete("/:id", deleteProduct)

export default router;
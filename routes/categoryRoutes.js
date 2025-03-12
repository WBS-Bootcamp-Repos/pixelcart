import express from "express";
import {
    getCategories, createCategory, getCategoryById, updateCategory, deleteCategory
} from "../controllers/categoryController.js";
import { validateCategory } from "../middleware/validateRequest.js";

const router = express.Router()

// GET /products - Get all products
router.get("/", getCategories)

// POST /products - Create a new product
router.post("/", validateCategory, createCategory)

// GET /products/:id - Get a product by ID
router.get("/:id", getCategoryById)

// PUT /products/:id - Update a product by ID
router.put("/:id", updateCategory)

// DELETE /products/:id - Delete a product by ID
router.delete("/:id", deleteCategory)

export default router;
import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// GET /users - Get all users
router.get("/", getUsers);

// POST /users - Create a new user
router.post("/", createUser);

// GET /users/:id - Get a user by ID
router.get("/:id", getUserById);

// PUT /users/:id - Update a user by ID
router.put("/:id", updateUser);

// DELETE /users/:id - Delete a user by ID
router.delete("/:id", deleteUser);

export default router;

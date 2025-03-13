import User from "../models/User.js";

// GET /users: Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude password field
    });
    res.status(200).json(users); // Return all users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// POST /users: Create a new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required.",
    });
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json(user);
  } catch (err) {
    // If it's a Sequelize validation error, respond with the details
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors.map((error) => error.message),
      });
    }

    return res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

// GET /users/:id: Fetch a specific user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude password field
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user); // Return the user details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user." });
  }
};

// PUT /users/:id: Update user details for a specific user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Validation: Ensure at least one field is provided for update
  if (!name && !email) {
    return res
      .status(400)
      .json({ message: "Name or email must be provided for update." });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user details
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save(); // Save the updated user

    res.status(200).json(user); // Respond with the updated user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user." });
  }
};

// DELETE /users/:id: Delete a specific user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy(); // Delete the user from the database
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user." });
  }
};

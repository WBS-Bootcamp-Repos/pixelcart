import Category from "../models/Category.js";


// GET /categories: Fetch all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories); // Return all categories
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch categories." })
    }
}

// POST /categories: Create a new category
export const createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required."
        })
    }

    try {
        const category = await Category.create({ name })
        return res.status(201).json(category)
    } catch (error) {
        // If it's a Sequelize validation error, respond with the details
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors.map((error) => error.message),
            });
        }

        return res.status(500).json({ message: "Error creating category", error: error.message })
    }
}

// GET /categories/:id: Fetch a specific category by ID
export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(404).json({ message: "Category not found." })
        }

        res.status(200).json(category); // Return the category details
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch category." })
    }
}

// PUT /categories/:id: Update category details for a specific category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // Validation: Ensure at least one field is provided for update
    if (!name) {
        return res.status(400).json({ message: "Name must be provided for update" })
    }

    try {
        const category = await Category.findByPk(id)
        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        // Update the category details
        if (name) category.name = name;
        await category.save(); // Save the updated category
        res.status(200).json(category) // Respond with the updated category
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update category" })
    }
}

// DELETE /categories/:id: Delete a specific category by ID

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }
        await category.destroy(); // Delete the category from the database
        res.status(200).json({ message: "Category deleted successfully." })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete the category" })
    }
}
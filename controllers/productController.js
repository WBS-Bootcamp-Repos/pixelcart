import Product from "../models/Product.js";


// GET /products: Fetch all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.status(200).json(products); // Return all products
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch products." })
    }
}

// POST /products: Create a new product
export const createProduct = async (req, res) => {
    const { name, description, usage } = req.body;

    if (!name || !description || !usage) {
        return res.status(400).json({
            message: "Name, description and usage are required."
        })
    }

    try {
        const product = await Product.create({ name, description, usage })
        return res.status(201).json(product)
    } catch (error) {
        // If it's a Sequelize validation error, respond with the details
        if (err.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors.map((error) => error.message),
            });
        }

        return res.status(500).json({ message: "Error creating product", error: err.message })
    }
}

// GET /products/:id: Fetch a specific product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found." })
        }

        res.status(200).json(product); // Return the product details
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch product." })
    }
}

// PUT /products/:id: Update product details for a specific product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validation: Ensure at least one field is provided for update
    if (!name && !description) {
        return res.status(400).json({ message: "Name or description must be provided for update" })
    }

    try {
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        // Update the product details
        if (name) product.name = name;
        if (description) product.description = description;
        await product.save(); // Save the updated product
        res.status(200).json(product) // Respond with the updated product
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update product" })
    }
}

// DELETE /products/:id: Delete a specific product by ID

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        await product.destroy(); // Delete the product from the database
        res.status(200).json({ message: "Product deleted successfully." })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete the product" })
    }
}
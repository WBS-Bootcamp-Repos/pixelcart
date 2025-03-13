import Order from '../models/Order.js';
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    // Check if all products exist and calculate total
    let total = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.productId} does not exist.` });
      }
      total += product.price * item.quantity;
    }

    // Create the order in the database
    const order = await Order.create({ userId, products, total });

    // Log the created order for debugging
    console.log("Created order:", order);

    // Send the created order as the response
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const updatedOrder = await order.update(req.body);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Order from '../models/Order.js';;
import User from '../models/User.js';
import Product from '../models/Product.js';
import OrderProduct from "../models/OrderProduct.js";

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
    if (!user) return res.status(400).json({ error: 'User does not exist' });

    //  Validate products and calculate total price
    let total = 0;
    const validatedProducts = [];

    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) return res.status(400).json({ error: `Product with ID ${item.productId} does not exist` });

      total += product.price * item.quantity;  
      validatedProducts.push({ productId: product.id, quantity: item.quantity });
    }

    //  Create Order
    const order = await Order.create({ 
      userId, 
      products: JSON.stringify(validatedProducts),  
      total 
    });

    res.status(201).json({ message: 'Order created successfully', order });
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
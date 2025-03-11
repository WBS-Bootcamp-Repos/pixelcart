import Order from '../models/Order.js';

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

    // Calculate total
    const total = products.reduce((sum, p) => sum + p.quantity * 10, 0); // Replace `10` with actual product price logic

    // Create the order in the database
    const order = await Order.create({ userId, products, total });

    // Log the created order for debugging
    console.log('Created order:', order);

    // Send the created order as the response
    res.status(201).json(order);
  } catch (error) {
    // Handle errors
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

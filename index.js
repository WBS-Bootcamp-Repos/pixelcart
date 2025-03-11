import express from 'express';
import sequelize from './db/index.js';
import orderRouter from './routers/orderRouter.js'; // Import orders router

const app = express();

// Middleware to parse JSON in request bodies
app.use(express.json());

// Define root route
app.get('/', (req, res) => {
  res.send('Welcome to the eCommerce API!');
});

// Connect the `/orders` route
app.use('/orders', orderRouter);

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

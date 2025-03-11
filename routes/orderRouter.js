import { Router } from 'express';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { createOrderSchema, updateOrderSchema } from '../schemas/orderSchemas.js';
import validateSchema from '../middleware/validateSchema.js';

const router = Router();

router.get('/', getOrders);
router.post('/', validateSchema(createOrderSchema), createOrder);
router.get('/:id', getOrderById);
router.put('/:id', validateSchema(updateOrderSchema), updateOrder);
router.delete('/:id', deleteOrder);

export default router;

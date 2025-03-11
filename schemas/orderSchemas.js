import Joi from 'joi';

export const createOrderSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    'any.required': 'User ID is required.',
    'number.base': 'User ID must be a number.',
  }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().required().messages({
          'any.required': 'Product ID is required.',
          'number.base': 'Product ID must be a number.',
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          'any.required': 'Quantity is required.',
          'number.base': 'Quantity must be a number.',
          'number.min': 'Quantity must be at least 1.',
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one product is required.',
    }),
});

export const updateOrderSchema = Joi.object({
  userId: Joi.number().integer().optional().messages({
    'number.base': 'User ID must be a number.',
  }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().optional().messages({
          'number.base': 'Product ID must be a number.',
        }),
        quantity: Joi.number().integer().min(1).optional().messages({
          'number.base': 'Quantity must be a number.',
          'number.min': 'Quantity must be at least 1.',
        }),
      })
    )
    .optional(),
});

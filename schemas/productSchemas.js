const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    categoryId: Joi.number().required()
});
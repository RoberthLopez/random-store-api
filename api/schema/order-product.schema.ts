import Joi, { NumberSchema, StringSchema, SchemaLike, ObjectSchema } from "joi";

const id: NumberSchema<number> = Joi.number().integer();
const orderId: NumberSchema<number> = Joi.number().integer();
const productId: NumberSchema<number> = Joi.number().integer();
const amount: NumberSchema<number> = Joi.number().integer().min(1);

export const createOrderProductSchema: ObjectSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

// export const updateOrderSchema: ObjectSchema = Joi.object({
//   name: name,
//   image: image,
// });

export const getOrderSchema: ObjectSchema = Joi.object({
  id: id.required(),
});

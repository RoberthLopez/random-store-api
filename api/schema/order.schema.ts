import Joi, { NumberSchema, StringSchema, SchemaLike, ObjectSchema } from "joi";

const id: NumberSchema<number> = Joi.number().integer();
const customerId: NumberSchema<number> = Joi.number().integer();

export const createOrderSchema: ObjectSchema = Joi.object({
  customerId: customerId.required(),
});

// export const updateOrderSchema: ObjectSchema = Joi.object({
//   name: name,
//   image: image,
// });

export const getOrderSchema: ObjectSchema = Joi.object({
  id: id.required(),
});

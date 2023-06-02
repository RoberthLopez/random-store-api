import Joi, { NumberSchema, StringSchema, SchemaLike, ObjectSchema } from "joi";

const id: NumberSchema<number> = Joi.number().integer();
const name: StringSchema<string> = Joi.string().min(3).max(15);
const price: NumberSchema<number> = Joi.number().integer().min(10);
const image: StringSchema<string> = Joi.string().uri();
const description: StringSchema<string> = Joi.string().min(10);
const categoryId: NumberSchema<number> = Joi.number().integer();
const limit: NumberSchema<number> = Joi.number().integer();
const offset: NumberSchema<number> = Joi.number().integer();

const price_min: NumberSchema<number> = Joi.number().integer();
const price_max: NumberSchema<number> = Joi.number().integer();

export const createProductSchema: ObjectSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema: ObjectSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

export const queryProductSchema: ObjectSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when("price_min", {
    is: Joi.exist(),
    then: Joi.required(),
  }),
});

export const getProductSchema: ObjectSchema = Joi.object({
  id: id.required(),
});

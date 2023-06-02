import Joi, { NumberSchema, StringSchema, SchemaLike, ObjectSchema } from "joi";

const id: NumberSchema<number> = Joi.number().integer();
const name: StringSchema<string> = Joi.string().min(3).max(15);
const image: StringSchema<string> = Joi.string().uri();

export const createCategorySchema: ObjectSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

export const updateCategorySchema: ObjectSchema = Joi.object({
  name: name,
  image: image,
});

export const getCategorySchema: ObjectSchema = Joi.object({
  id: id.required(),
});

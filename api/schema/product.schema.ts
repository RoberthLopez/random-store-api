import Joi, { ObjectSchema } from "joi";

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

interface ProdSch {
  name: string;
  price: number;
  image: string;
}

export const createProductSchema: ObjectSchema<ProdSch> = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

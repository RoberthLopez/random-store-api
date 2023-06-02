import Joi, { NumberSchema, StringSchema, SchemaLike, ObjectSchema } from "joi";
import { createUserSchema } from "./user.schema";

const id: NumberSchema<number> = Joi.number().integer();
const name: StringSchema<string> = Joi.string().min(3).max(15);
const lastName: StringSchema<string> = Joi.string().min(3).max(15);
const phone: StringSchema<string> = Joi.string();
const userId: NumberSchema<number> = Joi.number().integer();
// const email: StringSchema<string> = Joi.string().email();
// const password: StringSchema<string> = Joi.string();

export const createCustomerSchema: ObjectSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: createUserSchema,
  // user: Joi.object({
  //   email: email.required(),
  //   password: password.required(),
  // }),
});

export const updateCustomerSchema: ObjectSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

export const getCustomerSchema: ObjectSchema = Joi.object({
  id: id.required(),
});

import Joi, { NumberSchema, StringSchema, SchemaLike, ObjectSchema } from "joi";

const id: NumberSchema<number> = Joi.number().integer();
const email: StringSchema<string> = Joi.string().email();
const password: StringSchema<string> = Joi.string().min(8);
const role: StringSchema<string> = Joi.string().min(5);

export const createUserSchema: ObjectSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

export const updateUserSchema: ObjectSchema = Joi.object({
  email: email,
  role: role,
});

export const getUserSchema: ObjectSchema = Joi.object({
  id: id.required(),
});

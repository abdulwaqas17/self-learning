import Joi from "joi";

export const createPatientSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().min(0).required(),
  gender: Joi.string().valid("Male", "Female").required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});


export const updatePatientSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  age: Joi.number().min(0).optional(),
  gender: Joi.string().valid("Male", "Female").optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});


export const getPatientsQuerySchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
  search: Joi.string().optional(),
});


export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});

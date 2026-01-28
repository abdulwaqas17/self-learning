import Joi from "joi";

export const getQuerySchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
  search: Joi.string().optional(),
});


export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});
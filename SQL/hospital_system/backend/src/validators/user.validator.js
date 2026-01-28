import Joi from "joi";
import { ROLES } from "../constants/roles.js";

export const createUsersSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF)
    .required(),

  // Doctor-specific fields
  department_id: Joi.number().when("role", {
    is: ROLES.DOCTOR,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),

  hospital_id: Joi.number().when("role", {
    is: ROLES.DOCTOR,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),

  specialization: Joi.string().when("role", {
    is: ROLES.DOCTOR,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});

export const getUserQuerySchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
  search: Joi.string().optional(),
  role: Joi.string().valid(ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF).required()
});

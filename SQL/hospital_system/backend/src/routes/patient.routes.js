import express from "express";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  updatePatient,
} from "../controllers/patient.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPatientSchema, getPatientsQuerySchema, idParamSchema, updatePatientSchema } from "../validators/patient.validator.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  allowRoles(ROLES.ADMIN, ROLES.STAFF),
  validate(createPatientSchema),
  createPatient
);

router.get(
  "/get",
  authMiddleware,
  allowRoles(ROLES.ADMIN, ROLES.STAFF),
  validate(getPatientsQuerySchema, "query"),
  getAllPatients
);

router.get(
  "/:id",
  authMiddleware,
  allowRoles(ROLES.ADMIN,ROLES.STAFF,ROLES.DOCTOR),
  validate(idParamSchema, "params"),
  getPatientById
);

router.put(
  "/update/:id",
  authMiddleware,
  allowRoles(ROLES.ADMIN, ROLES.STAFF),
  validate(updatePatientSchema),
  updatePatient
);

router.delete(
  "/delete/:id",
  authMiddleware,
  allowRoles(ROLES.ADMIN, ROLES.STAFF),
  validate(idParamSchema, "params"),
  deletePatient
);

export default router;
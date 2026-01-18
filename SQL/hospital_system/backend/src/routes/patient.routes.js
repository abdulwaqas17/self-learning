import express from "express";
import {
  createPatient,
  getAllPatients,
} from "../controllers/patient.controller.js";

const router = express.Router();

router.post("/", createPatient);
router.get("/", getAllPatients);

export default router;
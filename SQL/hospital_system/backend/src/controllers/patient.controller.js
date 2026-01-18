import * as patientService from "../services/patient.service.js";

export const createPatient = async (req, res) => {
  try {
    const patientId = await patientService.createPatient(req.body);
    res.status(201).json({
      message: "Patient created successfully",
      patientId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.status(200).json({data:patients, message: "Patients retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

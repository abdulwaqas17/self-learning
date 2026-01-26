import * as patientService from "../services/patient.service.js";
import { sendResponse } from "../utils/ApiResponse.js";


// create patient function
export const createPatient = async (req, res) => {
  try {
    const patientId = await patientService.createPatient(req.body);
    sendResponse(res, 201, "Patient created successfully", { id: patientId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all patients function
export const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    sendResponse(res, 200, "Patients fetched successfully", patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update patient function
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await patientService.updatePatient(id, req.body);

    if (updated === 0) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    sendResponse(res, 200, "Patient updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete patient function
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await patientService.deletePatient(id);

    if (deleted === 0) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    sendResponse(res, 200, "Patient deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

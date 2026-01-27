import * as patientService from "../services/patient.service.js";
import { ApiError } from "../utils/ApiError.js";
import { sendResponse } from "../utils/ApiResponse.js";

// create patient function
export const createPatient = async (req, res, next) => {
  try {
    const patientId = await patientService.createPatient(req.body);
    sendResponse(res, 201, "Patient created successfully", { id: patientId });
  } catch (error) {
    next(error);
  }
};

// get all patients function
export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await patientService.getAllPatients();
    sendResponse(res, 200, "Patients fetched successfully", patients);
  } catch (error) {
    next(error);
  }
};

// get patient by id function
export const getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getPatientById(id);

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    sendResponse(res, 200, "Patient fetched successfully", patient);
  } catch (error) {
    next(error);
  }
};

// update patient function
export const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updated = await patientService.updatePatient(id, req.body);

    if (updated === 0) {
      throw new ApiError(404, "Patient not found");
    }

    sendResponse(res, 200, "Patient updated successfully");
  } catch (error) {
    next(error);
  }
};

// delete patient function
export const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await patientService.deletePatient(id);

    if (deleted === 0) {
      throw new ApiError(404, "Patient not found");
    }

    sendResponse(res, 200, "Patient deleted successfully");
  } catch (error) {
    next(error);
  }
};

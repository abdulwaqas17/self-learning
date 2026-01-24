import * as patientService from "../services/patient.service.js";

console.log('=================patientService===================');
console.log(patientService);
console.log('=================patientService===================');


// create patient function
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


// get all patients function
export const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.status(200).json({data:patients, message: "Patients retrieved successfully" });
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

    res.status(200).json({
      message: "Patient updated successfully",
    });
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

    res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import db from "../config/db.js";
import bcrypt from "bcrypt";

// create patient function
export const createPatient = async (data) => {
  const { name, age, gender, phone, address, password } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const [result] = await db.execute(
    `INSERT INTO patients (name, age, gender, phone, address,password)
     VALUES (?, ?, ?, ?, ?)`,
    [name, age, gender, phone, address, hashedPassword],
  );

  return result.insertId;
};

// get all patients function
export const getAllPatients = async () => {
  const [rows] = await db.execute("SELECT * FROM patients");
  return rows;
};

// get patient by id function
export const getPatientById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM patients WHERE id = ?", [id]);
  return rows[0];
}

// update patient function
export const updatePatient = async (id, data) => {
  const { name, age, gender, phone, address, password } = data;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const [result] = await db.execute(
    `UPDATE patients 
     SET name = ?, age = ?, gender = ?, phone = ?, address = ?, password = ?
     WHERE id = ?`,
    [name, age, gender, phone, address, hashedPassword, id],
  );

  return result.affectedRows;
};

// delete patient function
export const deletePatient = async (id) => {
  const [result] = await db.execute(`DELETE FROM patients WHERE id = ?`, [id]);

  return result.affectedRows;
};

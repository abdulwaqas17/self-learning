import db from "../config/db.js";

// create patient function
export const createPatient = async (data) => {
  const { name, age, gender, phone, address } = data;

  const [result] = await db.execute(
    `INSERT INTO patients (name, age, gender, phone, address)
     VALUES (?, ?, ?, ?, ?)`,
    [name, age, gender, phone, address]
  );

  return result.insertId;
};

// get all patients function
export const getAllPatients = async () => {
  const [rows] = await db.execute("SELECT * FROM patients");
  return rows;
};

// update patient function
export const updatePatient = async (id, data) => {
  const { name, age, gender, phone, address } = data;

  const [result] = await db.execute(
    `UPDATE patients 
     SET name = ?, age = ?, gender = ?, phone = ?, address = ?
     WHERE id = ?`,
    [name, age, gender, phone, address, id]
  );

  return result.affectedRows;
};

// delete patient function
export const deletePatient = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM patients WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};


import db from "../config/db.js";

export const createPatient = async (data) => {
  const { name, age, gender, phone, address } = data;

  const [result] = await db.execute(
    `INSERT INTO patients (name, age, gender, phone, address)
     VALUES (?, ?, ?, ?, ?)`,
    [name, age, gender, phone, address]
  );

  return result.insertId;
};

export const getAllPatients = async () => {
  const [rows] = await db.execute("SELECT * FROM patients");
  return rows;
};

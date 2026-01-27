import db from "../config/db.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";

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
export const getAllPatients = async ({ page, limit, search }) => {
  try {

    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = (page - 1) * limit;

    let whereClause = "";
    let values = [];

    const searchableFields = ["name", "phone", "gender", "address"];

    if (search) {
      const conditions = searchableFields.map(
        (field) => `${field} LIKE ?`
      );
      whereClause = `WHERE ${conditions.join(" OR ")}`;
      values = searchableFields.map(() => `%${search}`);
    }

    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total FROM patients ${whereClause}`,
      values
    );

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const [rows] = await db.execute(
      `SELECT * FROM patients
       ${whereClause}
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    return {
      data: rows,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    console.log('===============error in p pagin=====================');
    console.log(error);
    console.log('===============error in p pagin=====================');
    throw new ApiError(500, "Error fetching patients");
  }
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

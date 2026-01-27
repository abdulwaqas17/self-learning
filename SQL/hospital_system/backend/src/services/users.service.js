import db from "../config/database.js";
import bcrypt from "bcrypt";
import { ROLES } from "../constants/roles.js";
import { ApiError } from "../utils/ApiError.js";

export const createUser = async (data) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const { name, email, password, role } = data;

    // email check
    const [existing] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      throw new ApiError(409, "User with this email already exists");
    }

    // admin check
    if (role === ROLES.ADMIN) {
      const [admin] = await connection.execute(
        "SELECT id FROM users WHERE role = ?",
        [ROLES.ADMIN]
      );

      if (admin.length > 0) {
        throw new ApiError(409, "Admin already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const [userResult] = await connection.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    const userId = userResult.insertId;

    // doctor table insert
    if (role === ROLES.DOCTOR) {
      const { department_id, hospital_id, specialization } = data;

      await connection.execute(
        `INSERT INTO doctors (user_id, department_id, hospital_id, specialization)
         VALUES (?, ?, ?, ?)`,
        [userId, department_id, hospital_id, specialization]
      );
    }

    await connection.commit();
    return userId;

  } catch (error) {
    await connection.rollback();
    throw error; // ApiError as it is
  } finally {
    connection.release();
  }
};
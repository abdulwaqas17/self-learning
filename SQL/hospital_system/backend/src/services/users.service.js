import db from "../config/db.js";
import bcrypt from "bcrypt";
import { ROLES } from "../constants/roles.js";
import { ApiError } from "../utils/ApiError.js";

// create user service
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

// get all users service
export const getAllUsers = async ({ page, limit, search, role }) => {
  try {
    if (!role) {
      throw new ApiError(400, "Role is required");
    }

    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE role = ?";
    let values = [role];

    const searchableFields = ["name", "email"];

    if (search) {
      const conditions = searchableFields
        .map(field => `${field} LIKE ?`)
        .join(" OR ");

      whereClause += ` AND (${conditions})`;
      searchableFields.forEach(() => values.push(`%${search}%`));
    }

    // count query
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total FROM users ${whereClause}`,
      values
    );

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // data query
    const [rows] = await db.execute(
      `SELECT * FROM users
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
    console.log("Pagination Error:", error);
    throw new ApiError(500, "Error fetching users");
  }
};
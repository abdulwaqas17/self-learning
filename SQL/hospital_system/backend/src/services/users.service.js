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
      [email],
    );

    if (existing.length > 0) {
      throw new ApiError(409, "User with this email already exists");
    }

    // admin check
    if (role === ROLES.ADMIN) {
      const [admin] = await connection.execute(
        "SELECT id FROM users WHERE role = ?",
        [ROLES.ADMIN],
      );

      if (admin.length > 0) {
        throw new ApiError(409, "Admin already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const [userResult] = await connection.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
    );

    const userId = userResult.insertId;
    let newUser;

    // doctor table insert
    if (role === ROLES.DOCTOR) {
      const { department_id, hospital_id, specialization } = data;

      await connection.execute(
        `INSERT INTO doctors (user_id, department_id, hospital_id, specialization)
         VALUES (?, ?, ?, ?)`,
        [userId, department_id, hospital_id, specialization],
      );

      [[newUser]] = await connection.execute(
        "SELECT u.id, u.name, u.email, u.role, d.specialization, d.department_id, d.hospital_id FROM users u INNER JOIN docors d ON u.id = d.user_id WHERE u.id = ?",
        [userId],
      );
    } else {
      [[newUser]] = await connection.execute(
        "SELECT id, name, email, role FROM users WHERE id = ?",
        [userId],
      );
    }

    await connection.commit();
    return newUser;
  } catch (error) {
    await connection.rollback();
    throw error; // ApiError as it is
  } finally {
    connection.release();
  }
};

// get all users service
export const getAllUsers = async ({ page, limit, search, role }) => {
  page = Number(page) || 1;
  limit = Number(limit) || 10;
  const offset = (page - 1) * limit;

  let whereClause = "WHERE role = ?";
  let values = [role];

  const searchableFields = ["name", "email"];

  if (role === ROLES.DOCTOR) {
    searchableFields.push("specialization");
  }

  if (search) {
    const conditions = searchableFields
      .map((field) => `${field} LIKE ?`)
      .join(" OR ");

    whereClause += ` AND (${conditions})`;
    searchableFields.forEach(() => values.push(`%${search}%`));
  }

  // count query
  const [countResult] = await db.execute(
    `SELECT COUNT(*) as total FROM users ${whereClause}`,
    values,
  );

  const totalRecords = countResult[0].total;
  const totalPages = Math.ceil(totalRecords / limit);

  let rows;

  if (role === ROLES.DOCTOR) {
     [rows] = await db.execute(
      `SELECT u.id, u.name, u.email, u.role, u.is_deleted, u.deleted_at d.specialization, d.department_id, d.hospital_id FROM users u
       LEFT JOIN doctors d ON u.id = d.user_id
       ${whereClause}
       ORDER BY u.id DESC
       LIMIT ${limit} OFFSET ${offset}`,
      [...values],
    );
  } else {

    
    // data query
    [rows] = await db.execute(
      `SELECT id,name,email,role,is_deleted,deleted_at FROM users
      ${whereClause}
      ORDER BY id DESC
      LIMIT ${limit} OFFSET ${offset}`,
      [...values],
    );
    
  }
  return {
    data: rows,
    pagination: {
      totalRecords,
      totalPages,
      currentPage: page,
      limit,
    },
  };
};

// get user by id service
export const getUserById = async (id) => {
  let [[user]] = await db.execute(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [id],
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === ROLES.DOCTOR) {
    const [[doctor]] = await db.execute(
      "SELECT specialization, department_id, hospital_id FROM doctors WHERE user_id = ?",
      [id],
    );

    if (doctor) {
      user = { ...user, ...doctor };
    }
  }

  return user;
};

// update user service
export const updateUser = async (id, data) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const { name, email, role } = data;

    const [[user]] = await connection.execute(
      "SELECT role FROM users WHERE id = ?",
      [id],
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.role !== role) {
      throw new ApiError(400, "Role is not valid");
    }

    // email check
    const [existing] = await connection.execute(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, id],
    );

    if (existing.length > 0) {
      throw new ApiError(409, "User with this email already exists");
    }

    await connection.execute(
      `UPDATE users 
     SET name = ?, email = ?
     WHERE id = ?`,
      [name, email, id],
    );

    let updateUser;

    // doctor table update
    if (role === ROLES.DOCTOR) {
      const { specialization, department_id } = data;
      await connection.execute(
        "UPDATE doctors SET specialization = ?, department_id = ? where user_id = ?",
        [specialization, department_id, id],
      );

      [[updateUser]] = await connection.execute(
        "SELECT u.id, u.name, u.email, u.role, d.specialization, d.department_id, d.hospital_id FROM users u LEFT JOIN docors d ON u.id = d.user_id WHERE u.id = ?",
        [id],
      );
    } else {
      [[updateUser]] = await connection.execute(
        "SELECT id, name, email, role FROM users WHERE id = ?",
        [id],
      );
    }

    await connection.commit();

    return updateUser;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// delete user service
export const deleteUser = async (id) => {
  const [[user]] = await db.execute(
    "SELECT id, role FROM users WHERE id = ? AND is_deleted = false",
    [id],
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  } else if (user.role === ROLES.ADMIN) {
    throw new ApiError(400, "Cannot delete admin user");
  }

  // soft delete user
  await db.execute(
    `UPDATE users 
       SET is_deleted = true, deleted_at = NOW() 
       WHERE id = ?`,
    [id],
  );

  return true;
};

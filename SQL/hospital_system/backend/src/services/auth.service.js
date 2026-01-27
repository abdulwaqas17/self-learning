import db from "../config/db.js";
import bcrypt from "bcrypt";

export const loginUserService = async (email, password) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) return null;

  const user = rows[0];

  const isMatch = password === user.password;
  // const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

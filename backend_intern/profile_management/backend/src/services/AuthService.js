import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import  db  from '../config/db.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ---------------- GOOGLE LOGIN ---------------- */
export const googleLogin = async (idToken) => {
  // 1. Verify Google token
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  console.log('===================ticket=================');
  console.log(ticket);
  console.log('===================ticket=================');

  const payload = ticket.getPayload();

  console.log('===================payload=================');
  console.log(payload);
  console.log('===================payload=================');

  const email = payload.email;
  const full_name = payload.name;

  // 2. Check user in DB
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  console.log('=================rows===================');
  console.log(rows);
  console.log('=================rows===================');

  let user = rows[0];

  // 3. If not exists → signup
  if (!user) {
    const [result] = await db.execute(
      `INSERT INTO users 
       (full_name, email, profile_completed, role, token_version)
       VALUES (?, ?, false, 'MEMBER', 1)`,
      [full_name, email]
    );

    user = {
      id: result.insertId,
      full_name,
      email,
      role: 'MEMBER',
      token_version: 1
    };
  }

  // 4. Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      tokenVersion: user.token_version
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { user, token };
};


// export const emailSignup = async ({ full_name, email, password }) => {
//   let user = await findByEmail(email);
//   if (user) throw new Error("Email already exists");
//   const hashed = await hashPassword(password);
//   user = await createUser({
//     full_name,
//     email,
//     password: hashed,
//     profile_completed: false,
//     role: "MEMBER",
//   });
//   const token = generateToken(user);
//   return { user, token };
// };

// export const emailLogin = async ({ email, password }) => {
//   const user = await findByEmail(email);
//   if (!user) throw new Error("User not found");
//   const isMatch = await comparePassword(password, user.password);
//   if (!isMatch) throw new Error("Invalid password");
//   const token = generateToken(user);
//   return { user, token };
// };
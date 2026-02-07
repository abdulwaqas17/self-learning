import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/prisma.js';
import { ROLES } from '../constants/roles.js';
import { generateAccessToken } from '../utils/jwt.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (idToken) => { 


  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });



  const { email } = ticket.getPayload();

  let user = await prisma.user.findUnique({
    where: { email }
  });

  console.log('=================authService===================');
  console.log(idToken);
  console.log(ticket);
  console.log(user);
  console.log('=================authService===================');

  if (!user) {
    user = await prisma.user.create({
      data: {
        
        email,
        role: ROLES.MEMBER
      }
    });
  }

  const token = generateAccessToken(user);

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
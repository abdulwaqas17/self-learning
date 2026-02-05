import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { verifyGoogleToken } from "../utils/googleAuth.js";

export const googleLogin = async (idToken) => {
  const googleUser = await verifyGoogleToken(idToken);
  let user = await findByEmail(googleUser.email);
  if (!user) {
    user = await createUser({
      full_name: googleUser.name,
      email: googleUser.email,
      password: null,
      profile_completed: false,
      role: "MEMBER",
    });
  }
  const token = generateToken(user);
  return { user, token };
};

export const emailSignup = async ({ full_name, email, password }) => {
  let user = await findByEmail(email);
  if (user) throw new Error("Email already exists");
  const hashed = await hashPassword(password);
  user = await createUser({
    full_name,
    email,
    password: hashed,
    profile_completed: false,
    role: "MEMBER",
  });
  const token = generateToken(user);
  return { user, token };
};

export const emailLogin = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) throw new Error("User not found");
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid password");
  const token = generateToken(user);
  return { user, token };
};

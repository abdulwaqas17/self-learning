const bcrypt = require("bcryptjs");
const User = require("../../models/users");

//  User Signup Controller (for role: patient only)
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body;

    //  Basic required fields check
    if (!firstName || !email || !password || !gender) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    //  Check if email or phone already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    //  Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create new user (only patient role)
    const newUser = new User({
      firstName,
      lastName,
      email,

      password: hashedPassword,

      gender,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        id: newUser._id,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = registerUser;


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =======================
// REGISTER
// =======================
exports.register = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    // CHECK USER EXISTS
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.error("Register Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // RESPONSE
    res.status(200).json({
      message: "Login successful",
      token: token,
      role: user.role,
      userId: user._id
    });

  } catch (error) {

    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


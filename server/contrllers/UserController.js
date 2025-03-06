import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, userId: user._id.toString() });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
export const Register = async (req, res) => {
  try {
    const { email, password, name, gender, age, location, bio, interests } =
      req.body;

    if (!email || !password || !name || !gender || !age || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (isNaN(age) || age < 18 || age > 100) {
      return res.status(400).json({ error: "Invalid age" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let UserImg = req.file ? req.file.path : null;

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      gender,
      age,
      location,
      bio,
      image: UserImg || null,
      interests,
    });

    const savedUser = await newUser.save();

    res.json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

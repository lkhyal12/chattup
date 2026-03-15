import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import "dotenv/config";
import cloudinary from "../lib/cloudinary.js";
export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) === false) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }
    const user = await User.findOne({ email: email });
    if (user)
      return res.status(400).json({ message: "This email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL,
        );
      } catch (error) {
        console.log(error);
        return res
          .status(404)
          .json({ message: "email not found to send a welcome email" });
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (e) {
    console.error("Error in sign uo controller ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect === false)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);
    res.status(200).json({
      email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      id: user._id,
    });
  } catch (e) {
    console.log("Error in login controller", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "User logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile picture is required" });
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
  } catch (error) {}
};

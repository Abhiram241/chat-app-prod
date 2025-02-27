import { generateToken } from "../libs/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../libs/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must contain atleast six characters" });
    }
    const user = await User.findOne({ email }); //find if the user exists with the unique email id field
    if (user) {
      return res
        .status(400)
        .json({ message: "user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ message: "User was not created" });
    }
  } catch (error) {
    console.log(`${error} error occured`);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(`${error} error occured`);
    res.status(500).json({ message: "Internal server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "user logged out",
    });
  } catch (error) {
    console.log(`${error} error occured`);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      res.status(400).json({ message: "Profile Pic is required " });
    }
    try {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      ).select("-password");
      res.status(200).json(updatedUser);
    } catch (uploadError) {
      // Check if the error is related to file size exceeding the limit
      if (uploadError.http_code === 413) {
        return res.status(413).json({
          message:
            "Error: File size exceeds the allowed limit (10 MB for free tier)",
        });
      }
    }
  } catch (error) {
    console.log(`${error} error occured`);
    console.log(`${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
}; //u still need to check how this works in practical

export const checkAuth = (req, res) => {
  // this is to return the current user
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`The error in check auth is ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

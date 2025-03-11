const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//  Registration Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("🔹 Registration attempt:", username, email, password); // Debugging

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log(" Email already exists:", email);
      return res.status(400).json({ error: "Email already exists" });
    }

    
    user = new User({ username, email, password });
    await user.save();

    console.log(" User registered:", user._id);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//  Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔹 Login attempt:", email, password); // Debugging

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    console.log("User found:", user._id, "Stored password:", user.password); // Debugging

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password check result:", isMatch); // Debugging

    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(" Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

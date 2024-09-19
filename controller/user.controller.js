const { Users, Profile } = require("../models/profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  try {
    
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

     if (password.length <= 3) {
      return res.status(400).json({ message: "Password must be more than 3 characters long" });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({ email, password: hashedPassword, role: "User" });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in Registering User", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const createProfile = async (req, res) => {
  const { name, age, bio } = req.body;

  try {
    if (!name || !age || !bio) {
      return res.status(400).json({
        message: "Please provide all required fields: name, age, and bio",
      });
    }

    console.log("user", req.user);

    const profile = new Profile({ name, age, bio, user: req.user._id });

    await profile.save();

    res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    console.error("Error in Creating profile", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

  const deleteProfile = async (req, res) => {
    const profile = req.profile

    try {
      await Profile.findByIdAndDelete(profile._id);

      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      console.error("Error in deleting profile", error);
      res.status(500).json({ message: "Server error. Please try again." });
    }
  };

const getProfile = async (req, res) => {
  try {
    const profile = req.profile;
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error in fetching profile", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = req.profile;
    const { name, age, bio } = req.body;

    if (name) profile.name = name;
    if (age) profile.age = age;
    if (bio) profile.bio = bio;

    const updatedProfile = await profile.save();

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error in updating profile", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile
};

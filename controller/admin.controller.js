const { Profile } = require("../models/profile");

const getAllProfile = async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profiles = await Profile.find();

    // Check if profiles exist
    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    // Return the profiles as a JSON response
    res.status(200).json({ profiles });
  } catch (error) {
    console.error("Error in fetching profiles", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = {getAllProfile}
const { Profile } = require("../models/profile");

const isProfileOwnerOrAdmin = async(req, res, next) => {
  const profileId = req.params.id;

  try {
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profile.user.toString() !== req.user._id.toString() || req.user.role === "Admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    req.profile = profile
    next();
  } catch (error) {
    console.error("Error in checking profile ownership", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};

module.exports = {isProfileOwnerOrAdmin , isAdmin} 
const { registerUser , loginUser , createProfile, deleteProfile, getProfile, updateProfile } = require("../controller/user.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const { isProfileOwnerOrAdmin } = require("../middlewares/user.middleware");

const router = require("express").Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/create_profile", authenticateToken, createProfile)
router.delete("/delete_profile", authenticateToken, isProfileOwnerOrAdmin, deleteProfile);
router.get("/get_profile", authenticateToken, isProfileOwnerOrAdmin, getProfile)
router.put("/update_profile" , authenticateToken, isProfileOwnerOrAdmin, updateProfile)


module.exports = router;
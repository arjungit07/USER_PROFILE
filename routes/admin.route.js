const { getAllProfile } = require("../controller/admin.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/user.middleware");

const router = require("express").Router();



router.get("/get_all_profile", authenticateToken, isAdmin, getAllProfile)

module.exports = router
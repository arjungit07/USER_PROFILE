const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: {
    type: String,
    require: true,
  },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
});

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


module.exports = {
  Users: mongoose.model("users", userSchema),
  Profile : mongoose.model("profile",profileSchema)
};

const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db.config");
const user_routes = require("./routes/user.routes")
const admin_routes = require("./routes/admin.route");


const app = express();
dotenv.config();

connectDb()

app.use(express.json());



app.use("/api/profiles", user_routes);
app.use("/api/admin",admin_routes)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server is listening at server 8080");
});

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect = require("./config/data");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const adminRoute = require("./routes/admin");
dotenv.config();

connect();
const port = process.env.port;

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/admin", adminRoute);

app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});

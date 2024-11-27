const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect = require("./config/data");
const userRoute = require("./routes/user");
dotenv.config();

connect();
const port = process.env.port;

app.use(express.json());
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});

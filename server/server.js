const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//APP
const app = express();

//DB CONNECT
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection error", err));

//MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//ROUTES MIDDLEWARE

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//PORT
const port = process.env.PORT || 80000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

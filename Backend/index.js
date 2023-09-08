const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require('body-parser')
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));

// console.log(path.join(__dirname, '../public'))

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

require("dotenv").config();

// app.use(bodyParser.json)
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("mongoDB connection established successfully!!")
);
// // const { dirname } = require('path');

const productsRouter = require("./Routes/products");
const authRoute = require("./Routes/auth");
// const conversationsRoute = require("./Routes/conversations");
const userRoute = require("./Routes/users");
const conversationsRoute = require("./Routes/conversations");
const messageRoute = require("./Routes/messages");

app.use("/products", productsRouter);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/messages", messageRoute);
app.use("/conversations", conversationsRoute);

app.listen(port, () => {
  console.log(`RENTSTATION listening at http://localhost:${port}`);
});

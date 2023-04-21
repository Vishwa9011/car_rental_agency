const express = require("express");
const { connection } = require("./Configs/db");
const { CarRouter } = require("./routes/car.router");
const cors = require("cors");
const { UserRouter } = require("./routes/user.router");
const { BookRouter } = require("./routes/book.router");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
     res.send("Home Page")
})

app.use("/user", UserRouter);
app.use("/cars", CarRouter);
app.use("/booked", BookRouter);

const port = process.env.PORT || 8080;

app.listen(port, async () => {
     try {
          await connection;
          console.log("server is running");
     } catch (error) {
          console.log('error: ', error);
     }
})
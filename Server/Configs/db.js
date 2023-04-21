const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);
const connection = mongoose.connect(process.env.DATABASE_CONNECTION_URL);

module.exports = { connection };

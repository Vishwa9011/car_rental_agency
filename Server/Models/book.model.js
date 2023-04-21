const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
     },
     userID: {
          type: String,
          required: true
     },
     car: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Car"
     },
     carID: {
          type: String,
          required: true
     },
     no_of_days: {
          type: String,
          required: true
     },
     start_date: {
          type: String,
          required: true
     },
     agencyID: {
          type: String,
          required: true
     }
})


const BookModel = mongoose.model("Booking", BookSchema);

module.exports = { BookModel }
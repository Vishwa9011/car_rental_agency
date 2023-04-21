const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
     agency: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
     },
     agencyID: {
          type: String,
          required: true
     },
     vehicle_model: {
          type: String,
          required: true
     },
     vehicle_number: {
          type: String,
          required: true
     },
     seats: {
          type: Number,
          required: true
     },
     rent: {
          type: Number,
          required: true
     }
})


const CarModel = mongoose.model("Car", CarSchema);

module.exports = { CarModel }
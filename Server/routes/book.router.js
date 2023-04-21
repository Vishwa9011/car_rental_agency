const express = require("express");
const { BookModel } = require("../Models/book.model");
const { UserModel } = require("../Models/user.model");
const BookRouter = express.Router();



BookRouter.get("/", async (req, res) => {
     const query = req.query || {};
     try {
          const bookedCars = await BookModel.find(query).populate(['user', 'car']);
          res.status(200).json({ msg: "success", bookedCars });
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
})

BookRouter.post("/", async (req, res) => {
     const data = req.body;
     try {
          const bookedCar = new BookModel(data);
          await bookedCar.save();
          const user = await UserModel.findById(data.userID);
          user.rented_cars.push(data.carID);
          await user.save()
          res.status(200).json({ msg: "success", bookedCar });
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
})


module.exports = { BookRouter }
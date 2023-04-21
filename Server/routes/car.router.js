const express = require("express");
const { CarModel } = require("../Models/car.model");
const CarRouter = express.Router();

CarRouter.get("/", async (req, res) => {
     const query = req.query || {};
     try {
          const cars = await CarModel.find({ ...query }).populate("agency");
          res.status(200).json({ msg: 'success', cars })
     } catch (error) {
          console.log('error: ', error);
          res.status(403).json({ msg: "something went wrong" })
     }
})

CarRouter.post("/new", async (req, res) => {
     const data = req.body;
     try {
          const car = new CarModel(data);
          await car.save();
          res.status(200).json({ msg: 'success', car })
     } catch (error) {
          console.log('error: ', error);
          res.status(403).json({ msg: "something went wrong" })
     }
})

CarRouter.patch("/:_id/update", async (req, res) => {
     const id = req.params._id;
     const updateData = req.body;
     try {
          var car = await CarModel.findById(id);
          Object.assign(car, updateData);
          await car.save();
          res.status(200).json({ msg: 'success', car })
     } catch (error) {
          console.log('error: ', error);
          res.status(403).json({ msg: "something went wrong" })
     }
})

CarRouter.delete("/:_id/delete", async (req, res) => {
     const id = req.params._id;
     try {
          await CarModel.findByIdAndDelete(id);
          res.status(200).json({ msg: 'success' })
     } catch (error) {
          console.log('error: ', error);
          res.status(403).json({ msg: "something went wrong" })
     }
})

module.exports = { CarRouter }

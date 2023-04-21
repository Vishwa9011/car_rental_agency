const express = require('express');
const { UserModel } = require('../Models/user.model');
const UserRouter = express.Router();
const bcrypt = require("bcrypt");

UserRouter.get("/:id/get", async (req, res) => {
     const id = req.params.id
     try {
          const user = await UserModel.findById(id)
          res.status(200).json({ user, msg: "success" })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
})

UserRouter.get("/", async (req, res) => {
     try {
          const users = await UserModel.find()
          res.status(200).json({ users, msg: "success" })
     } catch (error) {
          console.log('error: ', error);
          res.send(error);
     }
})

UserRouter.post("/register", async (req, res) => {
     const { email, type, ...userDetails } = req.body;
     try {

          const checkUser = await UserModel.findOne({ email, type });
          if (checkUser && checkUser?.email) {
               return res.status(403).json({ msg: "user already exist" });
          }

          const hassedPass = await bcrypt.hash(userDetails.password, 5)
          const user = new UserModel({ ...userDetails, email, type, password: hassedPass });

          await user.save();

          const Token = await user.generateToken();

          res.cookie('jwt', Token, {
               maxAge: 3000000,
               httpOnly: true
          })

          res.status(200).json({ msg: "success", Token, user })
     } catch (error) {
          console.log('error: ', error);
          res.status(400).json({ msg: "something went wrong." })
     }
})

UserRouter.post("/login", async (req, res) => {
     const { email, type, ...data } = req.body;
     try {
          const user = await UserModel.findOne({ email, type })
          if (user) {
               const IsPassMatched = await bcrypt.compare(data.password, user.password);
               if (IsPassMatched) {
                    const token = await user.generateToken();
                    res.status(200).json({ msg: "success", token, user })
               } else {
                    res.status(401).json({ msg: 'password not matched' })
               }
          } else {
               res.status(404).json({ msg: "user not found" })
          }
     } catch (error) {
          console.log('error: ', error);
          res.status(400).json({ msg: "something went wrong." })
     }
})

UserRouter.post("/logout", async (req, res) => {
     const data = req.body;
     try {
          const user = await UserModel.findOne({ email: data.email })
          user.status = "offline";
          user.token = "";
          await user.save();

          res.clearCookie("jwt");
          res.status(200).json({ msg: "success" })
     } catch (error) {
          console.log('error: ', error);
          res.status(400).json({ msg: "something went wrong." })
     }
})





module.exports = { UserRouter }
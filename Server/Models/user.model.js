const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, lowercase: true },
     password: { type: String, required: true },
     type: { type: String, required: true },
     rented_cars: [
          { type: String }
     ],
     token: { type: String }
}, { versionKey: false })


userSchema.methods.generateToken = async function () {
     try {
          const Token = jwt.sign({ email: this.email }, process.env.TOKEN_SECRET_KEY_JWT, { expiresIn: '1h' })
          this.token = Token;
          this.save()
          return Token;
     } catch (error) {
          console.log('error: ', error);
     }
}


const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };
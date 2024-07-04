const userModel = require('../model/user.model')
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// SECRETKEY="123456789IUYTREWERTGHJKHBVCfguuhn"



const register = async (req, res) => {
  console.log("Incoming request body:", req.body);

  try {
      const { 
        firstName, lastName, phoneNumber,
         email, password } = req.body;
      console.log("Incoming registration request:", req.body);

      if (!(email && password)) {
          return res.status(400).json({ message: `Email and password are required`, status: 400 });
      }
      const userExist = await userModel.findOne({ email });
      if (userExist) {
          return res.status(400).json({ message: "Email already exists", status: 400 });
      }
      // const hashedPassword = await bcrypt.hash(password,8);
      // console.log("Hashed password:", hashedPassword);
      await new userModel({ email, password});
      const result = await userModel.create({
          email,
          firstName,
          lastName,
          phoneNumber,
          password,
      });
      return res.status(200).json({ User: result, message: "User registered successfully", status: 200 });
  } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: error.message, status: 500 });
  }
};


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(400).json({ message: "Both name and password are required", status: 400 });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials", status: 401 });
      }
      // const passwordMatch = await bcrypt.compare(password, user.password);
      // if (!passwordMatch) {
      //   return res.status(401).json({ message: "Invalid credentials", status: 401 });
      // }
    
      return res.status(200).json({ message: "Login successfull", user: {_id: user._id, email: user.email,password: user.password },});
    } catch (error) {
      return res.status(500).json({ message: error.message, status: 500 });
    }
  };


module.exports={
    login,
    register,
}
    

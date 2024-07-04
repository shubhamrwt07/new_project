const userModel = require('../model/user.model')
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// SECRETKEY="123456789IUYTREWERTGHJKHBVCfguuhn"


const saltRounds = 8;

const register = async (req, res) => {
  try {
    const {firstName,lastName,phoneNumber,email, password ,} = req.body;
    if (!( email &&password )) {
      return res.status(400).json({ message: `All fields are required`, status: 400 });
    }
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists", status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await new userModel({  email, password: hashedPassword });
    const result = await userModel.create({
      email:email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: hashedPassword
    });
    return res.status(200).json({ User: result, status: 200 });
  } catch (error) {
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
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials", status: 401 });
      }
    
      return res.status(200).json({ message: "Login successfull", user: {_id: user._id, email: user.email,password: user.password },});
    } catch (error) {
      return res.status(500).json({ message: error.message, status: 500 });
    }
  };


module.exports={
    login,
    register,
}
    

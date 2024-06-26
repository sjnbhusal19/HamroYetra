
const express = require('express')
const mongoose = require('mongoose');
const dbConnect = require('./src/db/connection');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

dbConnect()
const app = express()

app.use(express.json()); // Middleware to parse JSON
app.use(cors())

const userSchema = new Schema({
 
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  address:{
    type: String,
    required: true
  },
  password:String, // String is shorthand for {type: String}
  phoneNumber: {
    type: String,
    required: true
  },
  gender :{
    type: String,
    enum:['Male','Female','Others'],
  default:'male'
  },
  role:{type:String,
    enum: ['Rider','User'],
    default:'user'
  }
});

const User = mongoose.model('User', userSchema);

require ('dotenv').config()
const port = process.env.PORT 


app.post('/register', async(req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password,saltRounds)
    req.body.password=hashPassword;
    const phoneExist = await User.exists({phoneNumber:req.body.phoneNumber})
    const emailExist = await User.exists({email:req.body.email})
    
    if (phoneExist) {
      return res.status(409).json({msg :"Phone Number is already used"})
    }else if (emailExist){
      return res.status(409).json({msg:"Email is already used."})
    }
    await User.create(req.body)
    return res.status(201).json({msg: "Your account is sucessfully created."})
  }catch (error){
    res.status(400).send(error)}
})

app.get('/user', async(req, res) => {
  try {
    const registerData= await User.find();
  res.send(registerData);
  }catch(error){
    res.send(error);
  }
})

app.post('/login', async (req,res) =>{
  const user=await User.findOne({email:req.body.email})
  if (user){
    const isMatched= await bcrypt.compare(req.body.password,user.password);
    if (isMatched){
      const token = await jwt.sign({ email: req.body.email},process.env.SECRET_KEY);
      res.json({msg:"Sucessfully Login to HamroRide",token,user})
    }else{
      res.status(401).json({msg:"Invlide password."})
    }
  }else{
    res.status(401).json({msg:"Email is not registred."})
  }
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

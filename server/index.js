
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dbConnect = require('./src/db/connection');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;


dbConnect()

app.use(express.json()); // Middleware to parse JSON

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  fullName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:String, // String is shorthand for {type: String}
  gender :{
    type: String,
    enum:['male','female','other'],
  default:'female'
  },
  role:{type:String,
    enum: ['admin','rider','user'],
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
      return res.json({msg :"Phone Number is already used"})
    }else if (emailExist){
      return res.json({msg:"Email is already Used"})
    }
    const newUser=new User(req.body);
    const creatUser=await newUser.save();
    res.status(201).send(creatUser);
  }catch (error){
    res.status(400).send(error)}
})

app.get('/register', async(req, res) => {
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
      res.json({msg:"Authorized"})
    }else{
      res.json({msg:"Invlide password"})
    }
  }else{
    res.json({msg:"Email is not registred"})
  }
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

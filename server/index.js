
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

app.delete('/register/:id', async (req,res)=>{
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!req.params.id){
      return res.status(400).send();
    }
    res.send(deleteUser)
  } catch (error){
    res.status(500).send(error);
  }
})


app.post('/users', (req, res) => {
  User.create({name:"sujan", addr:"bharatpur"})
  res.send('ok')
})


app.get('/me', (req, res) => {
  res.send({
    name:"sujan",
    message:"Hello World"
  })
})

app.get('/users', async (req, res) => {
  const data = await User.find()
  res.send(data)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

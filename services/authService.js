const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {user}=require('../models/user');
require('dotenv').config()
exports.register=async({email,fname,password,storename})=>{
try {
     
     
     const hashedPassword = await bcrypt.hash(password, 10);
     const newuser=await user.create({email:email,fname:fname,password:hashedPassword,storename:storename})
     return newuser
     
     }
      catch (error) {
      throw error
     }
     
     
     };
exports.login=async({email,password})=>{
     try{
           const existingUser =await user.findOne({ email: email });
           if (!existingUser) {
                    throw new Error("Wrong credentials! Please provide correct email or password")
               };
               const isPasswordValid = await bcrypt.compare(password, existingUser.password);
               if (!isPasswordValid) throw new Error("Wrong credentials! Please provide correct email or password");
               
              
                   
               return existingUser
        
     }
     catch(error){
          throw error
     }
};

exports.generateAccessToken=(existingUser)=>{
     
     console.log(existingUser.email)
     return jwt.sign( {
          
          email: existingUser.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" });
   }
const {user}=require('../models/user');

exports.dashboard= async(user_email)=>{
     const user_info =await user.findOne({ email: user_email });
     return user_info
}
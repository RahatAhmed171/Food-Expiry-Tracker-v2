const {user}=require('../models/user');
const bcrypt = require('bcrypt');
exports.profile= async(usr_email)=>{
    try{
     const user_info =await user.findOne({ email: usr_email });
     if (!user_info) {
                    throw new Error("Wrong credentials! Please provide correct email or password")
               };
     return user_info
     
}
 catch(error){
          throw error
     }

}
exports.update= async(usr_email,{fname,storename})=>{
    try{
     const user_info =await user.findOne({ email: usr_email });
     if (!user_info) {
                    throw new Error("Wrong credentials! Please provide correct email or password")
               };
     let result=await user.update({
            fname: fname,
            storename: storename,
        },
        {
            where:{email:usr_email}
        })
        return result
     
}
 catch(error){
          throw error
     }

}
exports.changepassword= async(usr_email,{password,newpassword,retypenewpassword})=>{
    try{
     const retrieved_info =await user.findOne({ 
          attributes: ['password'],
          where: {
    email: usr_email,
  }
      });
      console.log(retrieved_info)
      console.log(newpassword)
      console.log(retypenewpassword)
      const isPasswordValid = await bcrypt.compare(password, retrieved_info.password);
      if (!isPasswordValid) throw new Error("Wrong credentials! Please provide correct email or password");
      if(!(newpassword==retypenewpassword)) throw new Error("Please provide new correct password");
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      let result=await user.update({
            password: hashedPassword,
           
        },
        {
            where:{email:usr_email}
        })

        console.log("succesfull")
        return result
     
}
 catch(error){
          throw error
     }

}
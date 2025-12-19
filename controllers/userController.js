const userService = require('../services/userService');
exports.profile = async (req, res) =>{
    try{
         const user_info=await userService.profile(req.user.email)
         res.render('profile', { email:user_info.email,name: user_info.fname, store: user_info.storename})
         }
         catch(error){
              res.status(400).json({ message: error.message });
         }
}
exports.update= async(req,res)=>{
     try{
          const { fname,storename } = req.body;
          const updated_user_info=await userService.update(req.user.email,{ fname, storename})
          res.redirect(301, 'profile')
     }
     catch(error){
           res.status(400).json({ message: error.message });

     }
}
exports.changepassword= async(req,res)=>{
     try{
       const {password,newpassword,retypenewpassword}=req.body
       await userService.changepassword(req.user.email,{password,newpassword,retypenewpassword})
       res.redirect(301, '/user/profile')
     }
     catch(error){
           res.status(400).json({ message: error.message });

     }
}
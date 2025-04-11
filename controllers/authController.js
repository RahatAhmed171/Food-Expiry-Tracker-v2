
const authService = require('../services/authService');


exports.register = async (req, res) => {
     try {
      /*
       
       if(!email || !password || !fname ||!storename){
          res.status(400).json({ message: 'Please provide all inputs' });
       }
         */
     
       const { email,fname, password,storename } = req.body;
       const newuser = await authService.register({ email,fname, password,storename }); // Call the service for logic
       let token=authService.generateAccessToken(newuser)
       res.cookie('authcookie',token,{maxAge:900000,httpOnly:true}) 
       res.redirect(301, '/dashboard')
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
   };

   exports.login=async(req,res)=>{
    try{
      const { email,password } = req.body;
     let existingUser= await authService.login({ email, password});
     let token = authService.generateAccessToken(existingUser)
     res.cookie('authcookie',token,{maxAge:900000,httpOnly:true,path: '/',         // Make sure this is present!
      secure: false,     // Add this if you're testing on localhost over HTTP
      sameSite: 'strict'})
     // res.status(200).json({ message: 'User login successfully',token:token });
     res.redirect(301,"/dashboard",)

    }
    catch(error){
      res.status(401).json({ message: error.message });
    }
   }
   exports.logout = async (req, res) => {
    try {
      // Clearing JWT cookie
      //res.cookie("authcookie", "", { maxAge: 0 });
      // Sending success response
      //res.clearCookie('token')
      //res.cookie("authcookie", "", { maxAge: 0 });
   
   
      res.cookie('authcookie', "", {
        httpOnly: true, 
        expires: new Date(Date.now() - 86400),
    })
      
      res.redirect(301,"/loginpage",)
    } catch (error) {
      // Handling errors
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
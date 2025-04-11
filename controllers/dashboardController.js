const dashboardService = require('../services/dashboardService');

exports.dashboard = async (req, res) =>{
     try{
     const user_info=await dashboardService.dashboard(req.user.email)
     res.render('dashboard', { name: user_info.fname, store: user_info.storename})
     }
     catch(error){
          res.status(400).json({ message: error.message });
     }
}
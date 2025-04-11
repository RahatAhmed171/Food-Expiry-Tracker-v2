const express = require('express');
const authController = require('../controllers/authController');
const { body, validationResult } = require("express-validator");
const router = express.Router()
router.post('/register',[
     [
       body("fname").notEmpty(),
       body("email").isEmail(),
       body("password").notEmpty(),
       body("storename").notEmpty(),
     ],
   ],
   async (req, res,next) => {
     const errors = validationResult(req);
     //console.log(errors)
 
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       next();
 
   },
      authController.register);
router.post('/login',[
  [
    body("email").isEmail(),
    body("password").notEmpty(),
  ],
],
async (req, res,next) => {
  const errors = validationResult(req);
  console.log(errors)

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();

},
   authController.login

)
router.get('/logout',authController.logout)
module.exports = router;
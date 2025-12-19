const express = require('express');
const { body, validationResult } = require("express-validator");
const {protect}=require("../middlewares/authMiddleware")
const userController = require('../controllers/userController');
const router = express.Router()
router.get('/profile',protect,userController.profile)
router.post('/profile',protect,
    [
     [
       body("fname").notEmpty().isString(),
       body("storename").notEmpty().isString(),
     ],
   ],
   async (req, res,next) => {
     const errors = validationResult(req);
     //console.log(errors)
 
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       next();
 
   },userController.update)
router.post('/profile/changepassword',protect,
     [
     [
       body("password").notEmpty(),
       body("newpassword").notEmpty().isLength({ min: 5 }),
       body("retypenewpassword").notEmpty().isLength({ min: 5 }),
     ],
   ],
   async (req, res,next) => {
     const errors = validationResult(req);
     //console.log(errors)
 
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       next();
 
   },userController.changepassword)
module.exports = router;
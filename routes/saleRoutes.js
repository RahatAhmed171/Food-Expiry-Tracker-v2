const express = require('express');
const router = express.Router()
const { body, validationResult } = require("express-validator");
const {protect}=require("../middlewares/authMiddleware");
const saleController = require('../controllers/saleControllers')
router.post('/calculate',protect,[
     [
       body("items").isArray({ min: 1 }).withMessage("Products list cannot be empty")
    
     ],
   ],saleController.calculateprice)
router.post('',protect,[
     [
       body("items").isArray({ min: 1 }).withMessage("Products list cannot be empty"),
       body("total_price").notEmpty(),
       body("customer_type").notEmpty()
    
     ],
   ],saleController.createsale)
router.get('',protect,saleController.getsales)
router.patch('/:id',protect,[
     [
       
       body("total_price").notEmpty().isFloat(),
       body("customer_type").notEmpty().isString().isIn(['quick', 'detailed']),

       body('delivery_time')
       .optional({ values: 'falsy' }) // Allows missing, null, and ""
       
      .isISO8601().withMessage('Invalid date format'),


      body('remaining,advance')
       .optional({ values: 'falsy' }) // Allows missing, null, and ""
       
      .isFloat().withMessage('Invalid format'),

     body('customer_phone')
    .optional({ values: 'falsy' }) // Allows null or ""
    .trim()
    // Regex for BD: Starts with 01, followed by 3-9, then 8 digits
    .matches(/^(?:\+88|88)?(01[3-9]\d{8})$/)
    .withMessage('Invalid phone number'),

    body('customer_name')
       .optional({ values: 'falsy' }) // Allows missing, null, and ""
      
      .isString().withMessage('Invalid name format'),



      

    
     ],
   ],saleController.updatesale)

router.delete('/:id',protect,saleController.deletesale)
module.exports = router;
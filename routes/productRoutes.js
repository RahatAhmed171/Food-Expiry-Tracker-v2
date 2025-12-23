const express = require('express');
const router = express.Router()
const { body, validationResult } = require("express-validator");
const {protect}=require("../middlewares/authMiddleware");
const productController = require('../controllers/productController');

router.get('',protect,productController.getproducts)
router.post('',protect, [
     [
       body("pname").notEmpty().isString(),
       body("ptype").notEmpty().isString(),
       body("threshold").notEmpty().isFloat(),
       body("total").notEmpty().isFloat(),
     ],
   ],productController.createproducts)
module.exports = router;
router.delete('/:id',protect,productController.deleteproduct)
router.patch('/:id',protect, [
       body("pname").notEmpty().isString(),
       body("ptype").notEmpty().isString(),
       body("threshold").notEmpty().isFloat(),
       body("total").notEmpty().isFloat(),
     ],productController.updateproduct)
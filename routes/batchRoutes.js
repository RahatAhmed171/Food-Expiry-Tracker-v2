const express = require('express');
const router = express.Router()
const { body, validationResult } = require("express-validator");
const {protect}=require("../middlewares/authMiddleware");
const batchController = require('../controllers/batchController')

router.get('',protect,batchController.getbatches)
router.post('',protect, [
    [
      body("quantity").notEmpty().isString(),
      body("expiry_date").notEmpty().isISO8601(),
      body("productid").notEmpty().isInt(),
    ],
  ],batchController.createbatch)

  router.patch('/:id',protect,[
    [
      body("expiry_date").notEmpty().isISO8601(),
   
    ],
  ],batchController.updatebatch)

router.delete('/:id',protect,batchController.deletebatch)

module.exports = router;
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

//get add-product
router.get('/add-product',adminController.getAddProduct);

//post add-product
router.post("/add-product",adminController.postAddProduct);


module.exports = router;
//init. express and its Router
const express = require('express');
const router = express.Router();

//getting shop Controller
const adminController = require('../controllers/admin');
//getting isAuth middleware
const isAuth = require('../middleware/is-auth');

//All Routes

// getting add-product
router.get('/add-product',adminController.getAddProduct);

// post add-product
router.post("/add-product",adminController.postAddProduct);

// get merchant start
router.get("/sell",adminController.getMerchantStart) ;

// get merchant main
router.get("/merchant-console",adminController.getMerchantMain) ;

// get product status
router.get("/product-status",adminController.getProductStatus) ;


module.exports = router;
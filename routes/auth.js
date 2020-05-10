//PJ
const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

//get user login
router.get('/login',authController.getLogin);

//post user login
router.post("/login",authController.postLogin);

//get merchant login
router.get('/merchant-login',authController.getMerchantLogin);

//post merchant login
router.post("/merchant-login",authController.postMerchantLogin);

//get merchant sign-up
router.get('/merchant-signUp',authController.getMerchantSignUp);

//post merchant sign-up
router.post("/merchant-signUp",authController.postMerchantSignUp);

//post merchant logout
router.get("/logout",authController.postMerchantLogout);


module.exports = router;
//init. express and its Router
const express = require('express');
const router = express.Router();

//getting shop Controller
const authController = require('../controllers/auth');
//getting isAuth middleware
const isAuth = require('../middleware/is-auth');

//All Routes

// getting user login
router.get('/login',authController.getLogin);

// post user login
router.post("/login",authController.postLogin);

// getting user signUp
router.get('/signUp',authController.getSignUp);

// post user signUp
router.post("/signUp",authController.postSignUp);

// getting merchant login
router.get('/merchant-login',authController.getMerchantLogin);

// post merchant login
router.post("/merchant-login",authController.postMerchantLogin);

// getting merchant sign-up
router.get('/merchant-signUp',authController.getMerchantSignUp);

// post merchant sign-up
router.post("/merchant-signUp",authController.postMerchantSignUp);

// getting corporate login
router.get('/corporate-login',authController.getCorporateLogin);

// post corporate login
router.post("/corporate-login",authController.postCorporateLogin);

// getting corporate sign-up
router.get('/corporate-signUp',authController.getCorporateSignUp);

// post corporate sign-up
router.post("/corporate-signUp",authController.postCorporateSignUp);

// logging req out 
router.get("/logout",authController.postLogout);


module.exports = router;
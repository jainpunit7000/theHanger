//init. express and its Router
const express = require('express');
const router = express.Router();

//getting shop Controller
const corporateController = require('../controllers/corporate');
//getting isAuth middleware
const isAuth = require('../middleware/is-auth');

//All Routes

// getting corporate login/signUp page
router.get("/corporate-governance",corporateController.getCorporateStart) ;

// getting corporate Console
router.get("/corporate-console",corporateController.getCorporateConsole) ;

// getting new request for corporate approval
router.get("/new-requests",corporateController.getNewRequests) ;

// getting requests that were accepted 
router.get("/accepted-requests",corporateController.getAcceptedRequests) ;

// accepting a product
router.get("/accept/:prodId",corporateController.postAccept) ;

// getting product list to finalize them
router.get('/finalize-product',corporateController.getFinalizeProduct);

//getting single product to finalize
router.get('/finalize/:prodId',corporateController.getSingleFinalize);

// making product final
router.post('/finalize',corporateController.postSingleFinalize);

// getting history
router.post('/history',corporateController.getHistory);

// getting product to edit
router.get("/edit-products",corporateController.getEditProducts) ;

// getting a single product for edit
router.get("/edit/:prodId",corporateController.getEditProduct) ;

// updating t he edited product
router.post("/edit",corporateController.postEditProduct) ;



module.exports = router;
//major initializaitons
const path = require('path') ;
const express = require('express') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//getting models
const Seller = require('./models/seller');
const Buyer = require('./models/buyer');
const Corporate = require('./models/corporate');

const MONGODB_URI = 'mongodb+srv://anurag:1ukBCbEqTxMCe2gz@cluster0-p7ghp.mongodb.net/shop';

//SessionInitialization
const session = require("express-session") ;
//mongodbStore initialization for storing session in db
const mongoDbStore = require("connect-mongodb-session")(session) ;
//configuring store for sessions
const store = new mongoDbStore({
    uri : MONGODB_URI,
    collection : "session"
}) ;

const app = express() ;

//configuring body-parser and setting static path to "/public"
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"/public"))) ;

// setting default view & engine - ejs
app.set('view engine','ejs');
app.set('views','views') ;

//Setting up Session Middleware
app.use(
    session({
        secret:"you can share any of your secrets with me :)",
        resave : false,
        saveUninitialized : false,
        store : store 
    })
)

//Making buyer Available in req.buyer
app.use((req, res, next) => {
    if (!req.session.buyer) {
      return next();
    }
    Buyer.findById(req.session.buyer._id)
      .then(buyer => {
        req.buyer = buyer;
        next();
      })
      .catch(err => console.log(err));
  });

//Making Merchant Available in req.merchant
app.use((req, res, next) => {
    if (!req.session.merchant) {
      return next();
    }
    Seller.findById(req.session.merchant._id)
      .then(merchant => {
        req.merchant = merchant;
        next();
      })
      .catch(err => console.log(err));
  });

//Making Corporate Available in req.corporate
app.use((req, res, next) => {
    if (!req.session.corporate) {
      return next();
    }
    Corporate.findById(req.session.corporate._id)
      .then(corporate => {
        req.corporate = corporate;
        next();
      })
      .catch(err => console.log(err));
  });

//making routes available
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const corpRoutes = require('./routes/corporate');

//init. isAuth locally
app.use((req,res,next) => {
  res.locals.isAuth = req.session.isLoggedIn ;
  next() ;
});

//making app listen to Routes
app.use(adminRoutes);
app.use(shopRoutes);
app.use('/auth',authRoutes);
app.use('/corporate',corpRoutes);

//Setting page not found controller actions
const errorController = require('./controllers/error');
app.use(errorController.get404);

//using mongoose to start server
mongoose.connect(MONGODB_URI)
    .then( result =>{
        console.log("----> Connected") ;
        app.listen(3000) ;
    } )
    .catch( err => {
        console.log(err) ;
    })
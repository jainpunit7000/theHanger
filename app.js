const path = require('path') ;

const express = require('express') ;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const Seller = require('./models/seller');
const Buyer = require('./models/buyer');

const MONGODB_URI = 'mongodb+srv://anurag:1ukBCbEqTxMCe2gz@cluster0-p7ghp.mongodb.net/shop';

//SessionInitinalization
const session = require("express-session") ;
const mongoDbStore = require("connect-mongodb-session")(session) ;
const store = new mongoDbStore({
    uri : MONGODB_URI,
    collection : "session"
}) ;


const app = express() ;

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"/public"))) ;

// setting viw engine - ejs
app.set('view engine','ejs');
app.set('views','views') ;

//SettingSessionMiddleware
app.use(
    session({
        secret:"you can share any of your secrets with me :)",
        resave : false,
        saveUninitialized : false,
        store : store 
    })
)

//MakingUserAvailable
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

//RoutesRegistered
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

//SessionMiddleware
app.use((req,res,next) => {
    res.locals.isAuth = req.session.isLoggedIn ;
    next() ;
});

//RoutesCalled
app.use(adminRoutes);
app.use(shopRoutes);
app.use('/auth',authRoutes);
app.use(errorController.get404);

//pj
mongoose.connect(MONGODB_URI)
    .then( result =>{
        console.log("----> Connected") ;
        app.listen(3000) ;
    } )
    .catch( err => {
        console.log(err) ;
    })
const path = require('path') ;

const express = require('express') ;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const Seller = require('./models/seller');
const Buyer = require('./models/buyer');

const MONGODB_URI = 'mongodb+srv://anurag:1ukBCbEqTxMCe2gz@cluster0-p7ghp.mongodb.net/shop';

//PJ
const session = require("express-session") ;
const mongoDbStore = require("connect-mongodb-session")(session) ;
const store = new mongoDbStore({
    uri : MONGODB_URI,
    collection : "session"
}) ;


const app = express() ;

//body-parser  related code - anurag
app.use(bodyParser.urlencoded({extended: false}));

// setting viw engine to ejs - pj
app.set('view engine','ejs');
app.set('views','views') ;

// PJ setting session middleware
app.use(
    session({
        secret:"you can share any of your secrets with me :)",
        resave : false,
        saveUninitialized : false,
        store : store 
    })
)

//routesRegistered - anurag

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

//work - pj
app.use(express.static(path.join(__dirname,"/public"))) ;
app.use((req,res,next) => {
    res.locals.isAuth = req.session.isLoggedIn ;
    next() ;
});

//RoutesCalled - anurag
app.use(adminRoutes);
app.use(shopRoutes);
//pj
app.use("/auth",authRoutes);

app.use(errorController.get404);

// mongooseConnection - anurag
// mongoose
// .connect(MONGODB_URI)
// .then(result => {
//     console.log("----> connected") ;

//     const buyer = new Buyer ({
//         name : 'Punit',
//         email : 'jainPunit7000@gmail.com',
//         wishlist : [],
//         bag : []
//     });
//     buyer.save();
//     const seller = new Seller ({
//         name : 'Anurag',
//         email : 'davanu100@gmail.com',
//         password : 'theHanger',
//         addedProducts : []
//     });
//     seller.save();
//     app.listen(3000);
// })
// .catch(err => {
//     console.log(err);
// });

//pj
mongoose.connect(MONGODB_URI)
    .then( result =>{
        console.log("----> Connected") ;
        app.listen(3000) ;
    } )
    .catch( err => {
        console.log(err) ;
    })
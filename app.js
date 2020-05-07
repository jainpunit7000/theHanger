const path = require('path') ;

const express = require('express') ;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://anurag:1ukBCbEqTxMCe2gz@cluster0-p7ghp.mongodb.net/test?retryWrites=true&w=majority';

const app = express() ;

//body-parser  related code - anurag
app.use(bodyParser.urlencoded({extended: false}));

// setting viw engine to ejs - pj
app.set('view engine','ejs');
app.set('views','views') ;

//routesRegistered - anurag

// const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

//work - pj
app.use(express.static(path.join(__dirname,"public"))) ;
// app.use((re,res,next) => {
//     res.render(path.join(__dirname,".","views","admin","add-product.ejs"))
// });

//RoutesCalled - anurag
// app.use(adminRoutes);
app.use(shopRoutes);
// app.use(authRoutes);

//mongooseConnection - anurag
// mongoose
// .connect(MONGODB_URI)
// .then(result => {
    app.listen(3000);
// })
// .catch(err => {
//     console.log(err);
// });
const express = require("express") ;
const path = require("path") ;
const app = express() ;

app.set("view engine","ejs");
app.set("views","views") ;
app.use(express.static(path.join(__dirname,"public"))) ;
app.use((re,res,next) => {
    res.render(path.join(__dirname,".","views","admin","add-product.ejs"))
})

app.listen(3000) ;
exports.postAddProduct = (req,res,next) => {
    console.log("----> product Data")
    console.log("title" + req.body.title ) ;
    console.log("brand"+" " + req.body.brand ) ;
    console.log("desc"+" " + req.body.desc ) ;
    console.log("price"+" " + req.body.price ) ;
    console.log("cat1"+" " + req.body.cat1 ) ;
    console.log("cat2"+" " + req.body.cat2 ) ;
    console.log("cat3"+" " + req.body.cat3 ) ;
    console.log("s38"+" " + req.body.size38 ) ;
    console.log("s40"+" " + req.body.size40 ) ;
    console.log("s42"+" " + req.body.size42 ) ;
    console.log("s44"+" " + req.body.size44 ) ;
    console.log("quan38"+" " + req.body.quan38 ) ;
    // console.log("size" + req.body.title ) ;
    res.redirect("/shop") ;
}
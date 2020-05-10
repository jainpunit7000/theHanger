const Product = require('../models/product');

exports.getHome = (req,res,next) => {
    res.render ( 'user/home' , {
        pageTitle : 'theHanger',
        path : '/'
    }); 
};

exports.getProductsShopMen = (req,res,next) => {
    Product.find()
    .then(products => {
        // console.log(products);
        res.render('products' , {
            prods : products,
            pageTitle : 'Men Section',
            path : '/shop/men'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProductMen = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        res.render('product', {
            product : product,
            pageTitle : product.title
            // path : '/shop/'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

//pj
exports.getShop = (req,res,next) => {
    Product.find({totalQuantity : {$gt : 0}})
        .then( products => {
            console.log("----> All Products Fetched") ;
            res.render("user/products",{
                pageTitle : "shop" ,
                prods : products 
            })
        } )
        .catch( err => {
            console.log(err) ;
        })
    // res.render("user/products",{
    //     pageTitle : "Products"
    // })
}
exports.getProduct = (req,res,next) =>{
    const productId = req.params.productId ;
    Product.findOne({_id : productId})
        .then( product => {
            if( !product ){
                return res.redirect("/shop") ;
            }
            res.render("user/product",{
                pageTitle : "product",
                product : product,
                size38 : product.size.size38.quantity>0 ? true : false  ,
                size40 : product.size.size40.quantity>0 ? true : false   ,
                size42 : product.size.size42.quantity>0 ? true : false   ,
                size44 : product.size.size44.quantity>0 ? true : false   
            })
        })
        .catch( err => {
            console.log(err) ;
        })
}
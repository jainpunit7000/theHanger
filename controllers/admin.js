const Product = require('../models/product');

exports.postAddProduct = (req,res,next) => {
    const title  = req.body.title;
    const price = req.body.price;
    const brand = req.body.brand;
    const imageUrl = req.body.imageUrl ;
    const desc = req.body.desc;
    const cat1 = req.body.cat1;
    const cat2 = req.body.cat2;
    const cat3 = req.body.cat3;
    const size38 = req.body.size38;
    const size40 = req.body.size40;
    const size42 = req.body.size42;
    const size44 = req.body.size44;
    let quan38 = req.body.quan38;
    let quan40 = req.body.quan40;
    let quan42 = req.body.quan42;
    let quan44 = req.body.quan44;
    if( !size38 )
        quan38 = 0 ;
    if( !size40 )
        quan40 = 0 ;
    if( !size42 )
        quan42 = 0 ;
    if( !size44 )
        quan44 = 0 ;
    const totalQuantity = quan38 + quan40 + quan42 + quan44 ;
    const product = new Product({
        userId : req.session.merchant._id ,
        title : title,
        price : price,
        desc : desc,
        brand : brand,
        imageUrl : imageUrl ,
        cat1 : cat1,
        cat2 : cat2,
        cat3 : cat3,
        size : {
            size38 : {
                quantity : quan38
            },
            size40 : {
                quantity : quan40
            },
            size42 : {
                quantity : quan42
            },
            size44 : {
                quantity : quan44
            }
        },
        totalQuantity: totalQuantity,
        status : "Pending",
        passedBy : null 
    });
    product
    .save()
    .then(result => {
        console.log('----> Product Created');
        res.redirect('/merchant-console');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getMerchantStart = (req,res,next) => {
    res.render('merchant/start',{
        pageTitle : 'merchant main',
        path : '/add-product',
        userName : req.session.merchant ? req.session.merchant.email : ""
    });
};

exports.getMerchantMain = (req,res,next) => {
    res.render('merchant/main',{
        pageTitle : 'merchant main',
        path : '/add-product',
        userName : req.session.merchant ? req.session.merchant.email : ""
    });
};

exports.getAddProduct = (req,res,next) => {
    res.render('merchant/admin/add-product',{
        pageTitle : 'Add-Product',
        path : '/add-product',
        userName : req.session.merchant ? req.session.merchant.email : ""
    });
};

exports.getProductStatus = (req,res,next) => {
    Product.find({userId : req.session.merchant._id})
        .then( products => {
            res.render("merchant/product-status",{
                pageTitle : "Product Status",
                products : products.reverse(),
                userName : req.session.merchant ? req.session.merchant.email : ""
            })
        } )
}
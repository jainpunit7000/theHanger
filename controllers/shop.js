const Product = require('../models/product');

exports.getHome = (req,res,next) => {
    res.render ( 'home' , {
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
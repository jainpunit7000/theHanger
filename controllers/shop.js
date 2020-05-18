const Product = require('../models/product');
const FinalProduct = require('../models/finalProduct');
const Buyer = require("../models/buyer") ;
const corporate = require("../models/corporate") ;

exports.getHome = (req,res,next) => {
    res.render ( 'user/home' , {
        pageTitle : 'theHanger',
        path : '/',
        userName : req.session.buyer ? req.session.buyer.email : ""
    }); 
};


exports.getProductsShopMen = (req,res,next) => {
    Product.find({status : "Completed"})
    .then(products => {
        console.log(products);
        res.render('products' , {
            prods : products,
            pageTitle : 'Men Section',
            path : '/shop/men',
            userName : req.session.buyer ? req.session.buyer.email : ""
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
            pageTitle : product.title,
            userName : req.session.buyer ? req.session.buyer.email : ""
        });
    })
    .catch(err => {
        console.log(err);
    });
};


exports.getShop = (req,res,next) => {
    FinalProduct.find({status : "Completed",totalQuantity : {$gt : 0}})
        .then( products => {
            console.log("----> All Products Fetched ") ;
            res.render("user/products",{
                pageTitle : "shop" ,
                prods : products.reverse() ,
                userName : req.session.buyer ? req.session.buyer.email : ""
            })
        } )
        .catch( err => {
            console.log(err) ;
        })
}


exports.getProduct = (req,res,next) =>{
    const productId = req.params.productId ;
    FinalProduct.findOne({_id : productId})
        .then( product => {
            if( !product ){
                return res.redirect("/shop") ;
            }
            res.render("user/product",{
                pageTitle : "product",
                product : product,
                userName : req.session.buyer ? req.session.buyer.email : ""
            })
        })
        .catch( err => {
            console.log(err) ;
        })
}


exports.postAddToBag = (req,res,next) => {
    const prodId = req.params.prodId;
    const size = req.body.size;
    console.log("----> size : "+size) ;
    FinalProduct.findById(prodId)
    .then(product => {
        return req.buyer.addToBag(product,size);
    })
    .then(result => {
        console.log(result);
        res.redirect('/user/bag');
    })
    .catch(err => console.log(err));
};


exports.postAddToWishlist = (req,res,next) => {
    const prodId = req.params.prodId;
    FinalProduct.findById(prodId)
    .then(product => {
        return req.buyer.addToWishlist(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/user/wishlist');
    })
    .catch(err => console.log(err));
};


exports.getWishlist = (req,res,next) => {
    req.buyer
    .populate('wishlist.items.productId')
    .execPopulate()
    .then(buyer => {
        const products = buyer.wishlist.items;
        res.render('user/wishlist', {
            pageTitle : 'Wishlist',
            products : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        });
    })
    .catch(err => console.log(err));
};


exports.getBag = (req,res,next) => {
    req.buyer
    .populate('bag.items.productId')
    .execPopulate()
    .then(buyer => {
        const products = buyer.bag.items;
        let bagTotal=0,bagDiscount=0;
        for(let i=0;i<products.length;++i){
            bagDiscount += (products[i].productId.currentPrice)*(products[i].quantity)*(products[i].productId.discount)/100 ;
            bagTotal += (products[i].productId.currentPrice)*(products[i].quantity);
        }
        res.render('user/bag', {
            pageTitle : 'Bag',
            products : products.reverse(),
            bagDiscount : bagDiscount,
            bagTotal : bagTotal,
            orderTotal : bagTotal - bagDiscount ,
            userName : req.buyer ? req.buyer.email : ""
        });
    })
    .catch(err => console.log(err));
};


exports.getRemoveFromBag = (req,res,next) => {
    const bagId = req.params.bagId;
    req.buyer
    .removeFromBag(bagId)
    .then(result => {
        res.redirect('/user/bag');
    })
    .catch(err => console.log(err));
};


exports.getRemoveAndAdd = (req,res,next) => {
    const bagId = req.params.bagId;
    req.buyer
    .moveToWishlist(bagId)
    .then(result => {
        req.buyer
        .populate('wishlist.items.productId')
        .execPopulate()
        .then(buyer => {
            const products = buyer.wishlist.items;
            res.render('user/wishlist', {
                pageTitle : 'Wishlist',
                products : products.reverse(),
                userName : req.buyer ? req.buyer.email : ""
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};


exports.getRemoveFromWishlist = (req,res,next) => {
    const productId = req.params.prodId;
    req.buyer
    .removeFromWishlist(productId)
    .then(result => {
        res.redirect('/user/wishlist');
    })
    .catch(err => console.log(err));
};


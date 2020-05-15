const Product = require('../models/product');
const Buyer = require("../models/buyer") ;

exports.getHome = (req,res,next) => {
    res.render ( 'user/home' , {
        pageTitle : 'theHanger',
        path : '/',
        userName : req.session.buyer ? req.session.buyer.email : ""
    }); 
};

exports.getProductsShopMen = (req,res,next) => {
    Product.find()
    .then(products => {
        // console.log(products);
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
            // path : '/shop/'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getShop = (req,res,next) => {
    Product.find({totalQuantity : {$gt : 0}})
        .then( products => {
            console.log("----> All Products Fetched") ;
            res.render("user/products",{
                pageTitle : "shop" ,
                prods : products.reverse() ,
                userName : req.session.buyer ? req.session.buyer.email : ""
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
                size44 : product.size.size44.quantity>0 ? true : false   ,
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
    Product.findById(prodId)
    .then(product => {
        return req.buyer.addToBag(product,size);
    })
    .then(result => {
        console.log(result);
        res.redirect('/user/bag');
    })
    .catch(err => console.log(err));
};

// exports.postAddToBag = (req,res,next) => {
//     const prodId = req.params.prodId ;
//     const size = req.body.size ;
//     const id = req.session.buyer._id ;
//     Buyer.findOne({_id: id})
//         .then( buyer => {
//             // console.log("-->"+ buyer) ;
//             const products = buyer.bag.items ;
//             let inBag = false ;
//             for(let i=0;i<products.length;++i){
//                 if( products[i].productId.toString() == prodId.toString() && products[i].size == size ){
//                     products[i].quantity = products[i].quantity + 1 ;
//                     inBag = true ;
//                 }
//             }
//             if( !inBag ){
//                 products.push({
//                     productId : prodId ,
//                     quantity : 1 ,
//                     size : size 
//                 })
//             }
//             // console.log("----. in dd to bag " + products) ;
//             buyer.wishlist.items = products ;
//             return buyer.save().then( result => {
//                 res.redirect("/user/bag") ;
//                 req.session.buyer = buyer ;
//             })
//         } )
//         .catch(err => {
//             console.log(err) ;
//         })
// }

exports.postAddToWishlist = (req,res,next) => {
    const prodId = req.params.prodId;
    Product.findById(prodId)
    .then(product => {
        return req.buyer.addToWishlist(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/user/wishlist');
    })
    .catch(err => console.log(err));
};

// exports.postAddToWishlist = (req,res,next) => {
//     const prodId = req.params.prodId ;
//     const id = req.session.buyer._id ;
//     Buyer.findOne({_id: id})
//         .then( buyer => {
//             // console.log("-->"+ buyer) ;
//             const productIds = buyer.wishlist.items ;
//             for(let i=0;i<productIds.length;++i){
//                 if( productIds[i].productId.toString() == prodId.toString() ){
//                     return res.redirect("/user/wishlist") ;
//                 }
//             }
//             buyer.wishlist.items.push({productId : prodId }) ;
//             return buyer.save().then( result => {
//                 res.redirect("/user/wishlist") ;
//                 req.session.buyer = buyer ;
//             })
//         } )
//         .catch(err => {
//             console.log(err) ;
//         })
// }

exports.getWishlist = (req,res,next) => {
    req.buyer
    .populate('wishlist.items.productId')
    .execPopulate()
    .then(buyer => {
        const products = buyer.wishlist.items;
        // console.log(products);
        res.render('user/wishlist', {
            pageTitle : 'Wishlist',
            products : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        });
    })
    .catch(err => console.log(err));
};

// exports.getWishlist = (req,res,next) => {
//     const id = req.session.buyer._id ;
//     Buyer.findOne({_id:id})
//         .then( buyer => {
//             buyer.populate("wishlist.items.productId").execPopulate()
//                 .then( buyerPop => {
//                     const products = buyerPop.wishlist.items ;
//                     // console.log(products[0].productId) ;
//                     res.render("user/wishlist",{
//                         pageTitle : "wishlist" ,
//                         products : products.reverse(),
//                         userName : req.session.buyer ? req.session.buyer.email : ""
//                     })
//                 } )
//         })
//         .catch(err =>{
//             console.log(err) ;
//         })
// }

exports.getBag = (req,res,next) => {
    req.buyer
    .populate('bag.items.productId')
    .execPopulate()
    .then(buyer => {
        const products = buyer.bag.items;
        let totalAmount=0;
        for(let i=0;i<products.length;++i){
            totalAmount += (products[i].productId.price)*(products[i].quantity);
        }
        res.render('user/bag', {
            pageTitle : 'Bag',
            products : products.reverse(),
            totalAmount : totalAmount,
            userName : req.buyer ? req.buyer.email : ""
        });
    })
    .catch(err => console.log(err));
};

// exports.getBag = (req,res,next) => {
//     const id = req.session.buyer._id ;
//     Buyer.findOne({_id:id})
//         .then( buyer => {
//             buyer.populate("bag.items.productId").execPopulate()
//                 .then( buyerPop => {
//                     let totalAmount = 0 ;
//                     const products = buyerPop.bag.items ;
//                     for(let i=0;i<products.length;++i){
//                         totalAmount += (products[i].productId.price)*(products[i].quantity) ;
//                     }
//                     // console.log("----> id = " + id) ;
//                     // console.log("----> " + products) ;
//                     res.render("user/bag",{
//                         pageTitle : "Bag" ,
//                         products : products.reverse(),
//                         totalAmount : totalAmount,
//                         userName : req.session.buyer ? req.session.buyer.email : ""
//                     })
//                 } )
//         })
//         .catch(err =>{
//             console.log(err) ;
//         })
// }

exports.getRemoveFromBag = (req,res,next) => {
    const bagId = req.params.bagId;
    req.buyer
    .removeFromBag(bagId)
    .then(result => {
        res.redirect('/user/bag');
    })
    .catch(err => console.log(err));
};

// exports.getRemoveFromBag = (req,res,next) => {
//     const bagId = req.params.bagId ;
//     const buyerId = req.session.buyer._id ;
//     Buyer.findOne({_id : buyerId})
//         .then( buyer => {
//             let bagItems = buyer.bag.items ;
//             let newBagItems = [] ;
//             for(let i =0 ;i<bagItems.length;++i){
//                 if( bagItems[i]._id.toString() != bagId.toString() )
//                     newBagItems.push(bagItems[i]) ;
//             }
//             buyer.bag.items = newBagItems ;
//             return buyer.save().then( result => {
//                 res.redirect("/user/bag") ;
//             } )
//         } )
//         .catch( err => {
//             console.log(err) ;
//         })
// }

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

// exports.getRemoveAndAdd = (req,res,next) => {
//     const bagId = req.params.bagId ;
//     const buyerId = req.session.buyer._id ;
//     Buyer.findOne({_id : buyerId})
//         .then( buyer => {
//             let bagItems = buyer.bag.items ;
//             let newBagItems = [] ;
//             let productAddedWishlist ;
//             for(let i =0 ;i<bagItems.length;++i){
//                 if( bagItems[i]._id.toString() != bagId.toString() )
//                     newBagItems.push(bagItems[i]) ;
//                 else
//                     productAddedWishlist = bagItems[i].productId ;
//             }
//             buyer.bag.items = newBagItems ;
//             return buyer.save().then( () => {
//                 res.redirect("/shop/add-to-wishlist/"+ productAddedWishlist.toString()) ;
//             } )
//         } )
//         .catch( err => {
//             console.log(err) ;
//         })
// }

exports.getRemoveFromWishlist = (req,res,next) => {
    const productId = req.params.prodId;
    req.buyer
    .removeFromWishlist(productId)
    .then(result => {
        res.redirect('/user/wishlist');
    })
    .catch(err => console.log(err));
};

// exports.getRemoveFromWishlist = (req,res,next) => {
//     const productId = req.params.prodId ;
//     const id = req.session.buyer._id ;
//     Buyer.findOne({_id:id})
//         .then( buyer => {
//             let wishlistItems = buyer.wishlist.items ;
//             let finalWishlist = [] ;
//             for(i=0;i<wishlistItems.length;++i){
//                 if( wishlistItems[i].productId.toString() != productId.toString() )
//                     finalWishlist.push(wishlistItems[i]) ;
//             }
//             buyer.wishlist.items = finalWishlist ;
//             return buyer.save().then( () => {
//                 res.redirect("/user/wishlist") ;
//             } )
//         })
//         .catch( err => {
//             console.log(err) ;
//         })
// }
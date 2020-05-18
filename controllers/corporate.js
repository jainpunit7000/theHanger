const Product = require('../models/product');
const Buyer = require("../models/buyer") ;
const corporate = require("../models/corporate") ;
const FinalProduct = require("../models/finalProduct") ;

exports.getFinalizeProduct = (req, res, next) => {
    req.corporate.populate("products.accepted.productId").execPopulate()
        .then( corp => {
            let productsNotFinalized = [] ;
            corp.products.accepted.forEach( product => {
                if( product.productId.status.toString() == "Accepted" ){
                    productsNotFinalized.push(product.productId) ;
                }
            } )
            res.render('corporate/finalize-product-list', {
                pageTitle: 'Finalizing a Product',
                products : productsNotFinalized,
                userName : req.session.corporate ? req.session.corporate.email : ""
              });
        } )
  };
  
exports.getSingleFinalize = (req, res, next) => {
    const id = req.params.prodId ;
    Product.findOne({_id:id})
        .then( product => {
            res.render('corporate/finalize-product', {
                pageTitle: 'Finalizing a Product',
                product : product,
                userName : req.session.corporate ? req.session.corporate.email : ""
              });
        } )
  };
  
exports.postSingleFinalize = (req, res, next) => {
    let cat1 = req.body.cat1 ;
    let cat2 = req.body.cat2 ;
    let cat3 = req.body.cat3 ;
    const title = req.body.title ;
    const brand = req.body.brand ;
    const desc = req.body.desc ;
    const currentPrice = req.body.currentPrice  ;
    const large = req.body.large  ;
    const medium = req.body.medium  ;
    const small = req.body.small  ;
    const oneSize = req.body.oneSize  ;
    const one = req.body.one  ;
    const two = req.body.two  ;
    const three = req.body.three  ;
    const four = req.body.four  ;
    const six = req.body.six  ;
    const seven = req.body.seven  ;
    const eight = req.body.eight  ;
    const nine = req.body.nine  ;
    const ten = req.body.ten  ;
    const image = [] ;
    if(req.body.image1){
        image.push({url : req.body.image1}) ;
    }
    if(req.body.image2){
        image.push({url : req.body.image2}) ;
    }
    if(req.body.image3){
        image.push({url : req.body.image3}) ;
    }
    if(req.body.image4){
        image.push({url : req.body.image4}) ;
    }
    if(req.body.image5){
        image.push({url : req.body.image5}) ;
    }
    const price = req.body.price ;
    const sellerId = req.body.sellerId ;
    let size = [],imageArray = [] ;
    cat1 = cat1.toString().toLowerCase() ;
    cat2 = cat2.toString().toLowerCase() ;
    cat3 = cat3.toString().toLowerCase() ;
    image.forEach( img => {
        if( img && img != "" ){
            imageArray.push({
                url : img
            }) ;
        }
    } )
    if( cat3 == "saree" ){
        size.push({
            particularSize : "1 Size",
            quantity : oneSize
        })
    }
    else if( cat2 != "footwear"){
        size.push({
            particularSize : "S",
            quantity : small
        })
        size.push({
            particularSize : "M",
            quantity : medium
        })
        size.push({
            particularSize : "L",
            quantity : large
        })
    }
    else{
        if( cat1 == "kids" ){
            size.push({
                particularSize : "1",
                quantity : one
            })
            size.push({
                particularSize : "2",
                quantity : two
            })
            size.push({
                particularSize : "3",
                quantity : three
            })
            size.push({
                particularSize : "4",
                quantity : four
            })
        }
        else{
            size.push({
                particularSize : "6",
                quantity : six
            })
            size.push({
                particularSize : "7",
                quantity : seven
            })
            size.push({
                particularSize : "8",
                quantity : eight
            })
            size.push({
                particularSize : "9",
                quantity : nine
            })
            size.push({
                particularSize : "10",
                quantity : ten
            })
        }
    }
    let total = 0 ;
    size.forEach( singleSize => {
        total += singleSize.quantity ;
    } )
    const sellerProductId = req.body.productId ;
    const newProduct = new FinalProduct({
        sellerId : sellerId,
        title : title,
        price : price,
        currentPrice : currentPrice,
        image : imageArray,
        brand : brand,
        desc : desc ,
        cat1 : cat1 ,
        cat2 : cat2 ,
        cat3 : cat3 ,
        size : size ,
        totalQuantity : total,
        passedBy : req.corporate._id
    })
    newProduct.save()
        .then( (product) => {
            const corporate = req.corporate ;
            corporate.products.passed.push({productId : product._id});  
            corporate.save() ;
            return res.redirect("/corporate/corporate-console") ;
        } )
        .then( () => {
            Product.findOne({_id:sellerProductId})
                .then( product => {
                    product.status = "Deployed";
                    product.passedBy = req.corporate._id ;
                    product.save() ;
                } )
        } )
        .catch( err => console.log(err)) ;
  };
  
exports.getHistory = (req,res,next) => {

}
exports.getEditProducts = (req,res,next) => {
    req.corporate.populate("products.passed.productId").execPopulate()
        .then( corp => {
            res.render('corporate/edit-products', {
                pageTitle: 'Products for Editing',
                products : corp.products.passed,
                userName : req.session.corporate ? req.session.corporate.email : ""
              });
        } )
}

exports.getEditProduct = (req,res,next) => {
    const prodId = req.params.prodId ;
    FinalProduct.findOne({_id : prodId})
        .then( product => {
            res.render('corporate/edit-product', {
                pageTitle: 'Editing a Product',
                product : product,
                userName : req.session.corporate ? req.session.corporate.email : ""
              });
        } )
}

exports.postEditProduct = (req,res,next) => {
    const title = req.body.title ;
    const brand = req.body.brand ;
    const desc = req.body.desc ;
    const price = req.body.price ;
    const currentPrice = req.body.currentPrice  ;
    const discount = req.body.discount ;
    const large = req.body.large  ;
    const medium = req.body.medium  ;
    const small = req.body.small  ;
    const oneSize = req.body.oneSize  ;
    const one = req.body.one  ;
    const two = req.body.two  ;
    const three = req.body.three  ;
    const four = req.body.four  ;
    const six = req.body.six  ;
    const seven = req.body.seven  ;
    const eight = req.body.eight  ;
    const nine = req.body.nine  ;
    const ten = req.body.ten  ;
    const image = [] ;
    if(req.body.image1){
        image.push({url : req.body.image1}) ;
    }
    if(req.body.image2){
        image.push({url : req.body.image2}) ;
    }
    if(req.body.image3){
        image.push({url : req.body.image3}) ;
    }
    if(req.body.image4){
        image.push({url : req.body.image4}) ;
    }
    if(req.body.image5){
        image.push({url : req.body.image5}) ;
    }
    FinalProduct.findOne({_id : req.body.productId})
        .then( product => {
            product.title = title ;
            product.brand = brand ;
            product.desc = desc ;
            product.price = price ;
            product.currentPrice = currentPrice ;
            product.discount = discount ;
            product.image = image ;
            if( product.size[0].particularSize == 'S' ){
                product.size[0].quantity = small ;
                product.size[1].quantity = medium ;
                product.size[2].quantity = large ;
            }
            else if( product.size[0] == "6" ){
                product.size[0].quantity = six ;
                product.size[1].quantity = seven ;
                product.size[2].quantity = eight ;
                product.size[3].quantity = nine ;
                product.size[4].quantity = ten ;
            }
            else if( product.size[0].particularSize == "1 Size" ){
                product.size[0].quantity = oneSize ;
            }
            else{
                product.size[0].quantity = one ;
                product.size[1].quantity = two ;
                product.size[2].quantity = three ;
                product.size[3].quantity = four ;
            }
            product.save().then( () => {
                console.log("----> product Updated") ;
                res.redirect("/corporate/corporate-console") ;
            } )
            .catch(err => console.log(err)) ;
        } )
}

exports.getCorporateStart = (req,res,next) => {
    res.render("corporate/start",{
        pageTitle : "corporate governance",
        userName : req.session.corporate ? req.session.corporate.email : ""
    })
}
exports.getCorporateConsole = (req,res,next) => {
    res.render("corporate/main",{
        pageTitle : "corporate governance",
        userName : req.session.corporate ? req.session.corporate.email : ""
    })
}
exports.getNewRequests = (req,res,next) => {
    Product.find({status : "Pending"})
        .then( products => {
            res.render("corporate/new-requests",{
                pageTitle : "New Requests",
                products : products,
                userName : req.session.corporate ? req.session.corporate.email : ""
            })
        } )
        .catch( err => console.log(err) ) ;
}

exports.postAccept = (req,res,next) => {
    const prodId = req.params.prodId ;
    Product.findOne({_id : prodId})
        .then( product => {
            product.status = "Accepted" ;
            product.passedBy = req.corporate._id ;
            return product.save() ;
        })
        .then( () => {
            const corporate = req.corporate ;
            corporate.products.accepted.push({productId : prodId}) ;
            return corporate.save()
                .then( () => {
                    res.redirect("/corporate/accepted-requests") ;
                } )
        } )
        .catch( err => console.log(err)  ) ;
}
exports.getAcceptedRequests = (req,res,next) => {
    req.corporate.populate("products.accepted.productId").execPopulate()
        .then( corp => {
            res.render("corporate/accepted-requests",{
                pageTitle : "Accepted Requests",
                products : corp.products.accepted.reverse(),
                userName : req.session.corporate ? req.session.corporate.email : ""
            })
        } )
}
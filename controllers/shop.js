const Product = require('../models/product');
const FinalProduct = require('../models/finalProduct');
const Buyer = require("../models/buyer") ;
const corporate = require("../models/corporate");

exports.getHome = (req,res,next) => {
    res.render ( 'user/home' , {
        pageTitle : 'theHanger',
        path : '/',
        userName : req.buyer ? req.buyer.email : ""
    }); 
};

exports.postShop = (req,res,next) => {
    let array="";
    let cat1,cat2,cat3;
    const query = req.body.search;
    const queries = query.split(' ');

    for(let i = 0;i<queries.length;++i){
        if(queries[i]=='men' || queries[i]=='women' || queries[i]=='kids' && !cat1)
            cat1 = queries[i];
        else if(queries[i]=='topwear' || queries[i]=='bottomwear' || queries[i]=='footwear' || queries[i]=='western' || queries[i]=='indian' || queries[i]=='boysclothing' || queries[i]=='boysfootwear' || queries[i]=='girlsclothing' || queries[i]=='girlsfootwear' && !cat2)
            cat2 = queries[i];
        else if(queries[i]=='tshirts' || queries[i]=='shirts' || queries[i]=='sweaters' || queries[i]=='jackets' || queries[i]=='sweatshirts' || queries[i]=='jeans' || queries[i]=='trousers' || queries[i]=='shorts' || queries[i]=='casuals' || queries[i]=='sports' || queries[i]=='formals' || queries[i]=='tops' || queries[i]=='shrugs' || queries[i]=='kurtis' || queries[i]=='lehengas' || queries[i]=='sarees' || queries[i]=='heels' || queries[i]=='boots' || queries[i]=='flats' || queries[i]=='sandals' || queries[i]=='capris' || queries[i]=='flipflops' && !cat3)
            cat3 = queries[i];
        else{
            array += queries[i] + " ";
        }
    }
    console.log(queries);
    console.log(array);
    console.log(cat1);
    console.log(cat2);
    console.log(cat3);   
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            $text : {
                $search : array,
                $caseSensitive : false,
            }
        },
        {
            score : {
                $meta : 'textScore'
            }
        }
    )
    .sort(
        {
            score : {
                $meta : 'textScore'
            }
        }
    )
    .then( products => { 
        if(products.length == 0){
            FinalProduct
            .find({
                status : "Completed",
                totalQuantity : {$gt : 0},
            })
            .then(result => {
                const updatedProducts = result.filter(item => {
                    if(cat1&&cat2&&cat3)
                        return (item.cat1 === cat1 && item.cat2===cat2 && item.cat3===cat3);
                    else if(cat1&&cat2)
                        return (item.cat1 === cat1 && item.cat2===cat2);
                    else if(cat1&&cat3)
                        return (item.cat1 === cat1 && item.cat3===cat3);
                    else if(cat3&&cat2)
                        return (item.cat3 === cat3 && item.cat2===cat2);
                    else if(cat1)
                        return (item.cat1 === cat1);
                    else if(cat2)
                        return (item.cat2 === cat2);
                    else if(cat3)
                        return (item.cat3 === cat3);
                    else
                        return false;
                }); 
                console.log("----> All Products Fetched ");
                res.render("user/products",{
                    pageTitle : 'Shop',
                    prods : updatedProducts,
                    userName : req.buyer ? req.buyer.email : ""
                })
            })
        }
        else{
            const updatedProducts = products.filter(item => {
                if(cat1&&cat2&&cat3)
                    return (item.cat1 === cat1 && item.cat2===cat2 && item.cat3===cat3);
                else if(cat1&&cat2)
                    return (item.cat1 === cat1 && item.cat2===cat2);
                else if(cat1&&cat3)
                    return (item.cat1 === cat1 && item.cat3===cat3);
                else if(cat3&&cat2)
                    return (item.cat3 === cat3 && item.cat2===cat2);
                else if(cat1)
                    return (item.cat1 === cat1);
                else if(cat2)
                    return (item.cat2 === cat2);
                else if(cat3)
                    return (item.cat3 === cat3);
                else
                    return true;
            });
            console.log("----> All Products Fetched ");
            res.render("user/products",{
                pageTitle : 'Shop',
                prods : updatedProducts,
                userName : req.buyer ? req.buyer.email : ""
            })
        }
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getShop = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0}
        }
    )
    .then( products => {
        console.log("----> All Products Fetched ");
        res.render("user/products",{
            pageTitle : 'Shop',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};






//For an individual product
exports.getProduct = (req,res,next) => {
    const productId = req.params.productId;
    FinalProduct.findOne({_id : productId})
    .then(product => {
        if(!product){
            return res.redirect("/shop") ;
        }
        res.render("user/product",{
            pageTitle : 'Product',
            product : product,
            userName : req.buyer ? req.buyer.email : ""
        });
    })
    .catch(err => {
        console.log(err) ;
    });
};






//Cart,Orders,Wishlist Related Routes

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





//for all the nav-bar routes

exports.getProductsShopMen = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenTopWear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'topwear' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenBottomWear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'bottomwear' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenFootWear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'footwear' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenTshirts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'topwear',
            cat3 : 'tshirts' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenShirts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'topwear',
            cat3 : 'shirts' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenSweaters = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'topwear',
            cat3 : 'sweaters' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenJackets = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'topwear',
            cat3 : 'jackets' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenSweatshirts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'topwear',
            cat3 : 'sweatshirts' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenJeans = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'bottomwear',
            cat3 : 'jeans' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenTrousers = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'bottomwear',
            cat3 : 'trousers' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenShorts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'bottomwear',
            cat3 : 'shorts' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenCasualShoes = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'footwear',
            cat3 : 'casuals' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenFormals = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'footwear',
            cat3 : 'formals' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsMenSports = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'men',
            cat2 : 'footwear',
            cat3 : 'sports' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsShopWomen = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenWesternWear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'western',
            // cat3 : 'sports' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenTops = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'western',
            cat3 : 'tops' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenJeans = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'western',
            cat3 : 'jeans' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenJacketsCoats = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'western',
            cat3 : 'jackets' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenShrugs = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'western',
            cat3 : 'shrugs' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenIndianWear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'indian',
            // cat3 : 'sports' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenKurtis = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'indian',
            cat3 : 'kurtis' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenLehengas = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'indian',
            cat3 : 'lehangas' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenSarees = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'indian',
            cat3 : 'sarees' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenFootWear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'footwear',
            // cat3 : 'sports' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenBoots = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'footwear',
            cat3 : 'boots' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenFlats = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'footwear',
            cat3 : 'flats' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Men Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenHeels = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'footwear',
            cat3 : 'heels' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsWomenCasuals = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'women',
            cat2 : 'footwear',
            cat3 : 'casuals' 
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'women Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsShopKids = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsBoysClothing = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysclothing'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsBoysTshirts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysclothing',
            cat3 : 'tshirts'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsBoysShirts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysclothing',
            cat3 : 'shirts'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsBoysShorts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysclothing',
            cat3 : 'shorts'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsBoysJeans = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysclothing',
            cat3 : 'jeans'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsBoysJackets = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysclothing',
            cat3 : 'jackets'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsBoysFootWear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysfootwear',
            // cat3 : 'jackets'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsBoysCasuals = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysfootwear',
            cat3 : 'casuals'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsBoysSports = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysfootwear',
            cat3 : 'sports'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};

exports.getProductsBoysSandals = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'boysfootwear',
            cat3 : 'sandals'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsClothing = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsclothing',
            // cat3 : 'sandals'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsTops = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsclothing',
            cat3 : 'tops'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsTshirts = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsclothing',
            cat3 : 'tshirts'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsJeans = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsclothing',
            cat3 : 'jeans'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsJackets = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsclothing',
            cat3 : 'jackets'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsCapris = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsclothing',
            cat3 : 'capris'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsFootwear = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsfootwear',
            // cat3 : 'capris'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsCasuals = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsfootwear',
            cat3 : 'casuals'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsFlipFlops = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsfootwear',
            cat3 : 'flipflops'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsHeels = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsfootwear',
            cat3 : 'heels'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
exports.getProductsGirlsFlats = (req,res,next) => {
    FinalProduct
    .find(
        {
            status : "Completed",
            totalQuantity : {$gt : 0},
            cat1 : 'kids',
            cat2 : 'girlsfootwear',
            cat3 : 'flats'
        }
    )
    .then( products => {
        res.render("user/products",{
            pageTitle : 'Kids Section',
            prods : products.reverse(),
            userName : req.buyer ? req.buyer.email : ""
        })
    })
    .catch(err => {
        console.log(err) ;
    });
};
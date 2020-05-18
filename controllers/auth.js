const Seller = require("../models/seller");
const Buyer = require("../models/buyer") ;
const Corporate = require("../models/corporate") ;
const bcrypt = require("bcryptjs") ;


exports.getLogin = (req,res,next) => {
    res.render("user/auth/login",{
        pageTitle : 'Login Please',
        path: "/login"
    })   
}
exports.postLogin = (req,res,next) => {
    const email = req.body.email ;
    const password = req.body.password ;
    Buyer.findOne({email:email})
        .then( buyer => {
            if( !buyer ){
                return res.redirect("/auth/login") ;
            }
            return bcrypt.compare(password,buyer.password)
                .then( match => {
                    if( match ){
                        req.session.isLoggedIn = true ;
                        req.session.buyer = buyer ;
                        console.log("----> Buyer logged in") ;
                        return req.session.save(err => {
                            console.log("-->" + err) ;
                            res.redirect("/shop") ;
                        })
                    }
                    return res.redirect("/auth/login") ;
                } )
        } )
        .catch(err => {
            console.log(err) ;
        }) 
}
exports.getSignUp = (req,res,next) => {
    res.render("user/auth/sign-up",{
        pageTitle : 'Add-Product',
        path: "/sign-up"
    })   
}
exports.postSignUp = (req,res,next) => {
    const email = req.body.email ;
    const password = req.body.password ;
    Buyer.findOne({email:email})
        .then( buyer => {
            if( buyer ){
                console.log("----> error failed") ;
                return res.redirect("/auth/signUp") ;
            }
            return bcrypt.hash(password,12)
        })
        .then( hashedPassword => {
            if(hashedPassword){
                const byr = new Buyer({
                    email : email,
                    password : hashedPassword
                })
                return byr.save().then( result => {
                    console.log("----> new Buyer created") ;
                    res.redirect("/auth/login") ;
                })
                .catch( err => {
                    console.log(err) ;
                })
            }
        } )
        .catch( err => {
            console.log(err) ;
        })
}
exports.getMerchantLogin = (req,res,next) => {
    res.render("merchant/auth/login",{
        pageTitle : 'Add-Product',
        path: "/login"
    }) 
}
exports.postMerchantLogin = (req,res,next) => {
    const email = req.body.email ;
    const password = req.body.password ;
    Seller.findOne({email:email})
        .then( merchant => {
            if(!merchant){
                return res.redirect("/auth/merchant-login") ;
            }
            bcrypt.compare(password,merchant.password)
                .then( match => {
                    if( match ){
                        req.session.isLoggedIn = true ;
                        req.session.merchant = merchant ;
                        console.log("----> Merchant logged in") ;
                        return req.session.save(err => {
                            console.log("-->" + err) ;
                        })
                    }
                    return res.redirect("/auth/merchant-login") ;
                } )
            } ) 
        .catch( err => {
            console.log(err) ;
        })
}

exports.getMerchantSignUp = (req,res,next) => {
    res.render("merchant/auth/sign-up",{
        pageTitle : 'Add-Product',
        path: "/sign-up"
    })   
}

exports.postMerchantSignUp = (req,res,next) => {
    const email = req.body.email ;
    const password = req.body.password ;
    Seller.findOne({email:email})
        .then( merchant => {
            if( merchant ){
                return res.redirect("/auth/merchant-signUp") ;
            }
            return bcrypt.hash(password,12) ;
        } )
        .then( hashedPassword => {
            const merchant = new Seller({
                email : email ,
                password : hashedPassword
            })
            return merchant.save()
        } )
        .then( result => {
            console.log("----> new Merchant account Created") ;
            res.redirect("/auth/merchant-login") ;
        } )
        .catch( err => {
            console.log(err) ;
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        console.log("----> logged out os the session") ;
        res.redirect("/") ;
    });
};
  
exports.getCorporateSignUp = (req,res,next) => {
    res.render("corporate/auth/sign-up",{
        pageTitle : "corporate governance sign up"
    })
}
exports.getCorporateLogin = (req,res,next) => {
    res.render("corporate/auth/login",{
        pageTitle : "corporate governance login"
    })
}
exports.postCorporateSignUp = (req,res,next) => {
    console.log("----> in post sign up") ;
    const email = req.body.email ;
    const password = req.body.password ;
    const token = req.body.token ;
    Corporate.findOne({email})
        .then( corporate => {
            if( corporate || token != "1A234" ){
                return res.redirect("/auth/corporate-signUp") ;
            }
            return bcrypt.hash(password,12) ;
        } )
        .then( hashedPassword => {
            console.log("----> here") ;
            const corporate = new Corporate({
                email : email ,
                password : hashedPassword,
                product : {
                    acquired : [],
                    passed : []
                }
            })
            return corporate.save()
        } )
        .then( result => {
            console.log("----> new corporate account Created") ;
            res.redirect("/auth/corporate-login") ;
        } )
        .catch( err => {
            console.log(err) ;
        })
}
exports.postCorporateLogin = (req,res,next) => {
    const email = req.body.email ;
    const password = req.body.password ;
    Corporate.findOne({email:email})
        .then( corporate => {
            if(!corporate){
                return res.redirect("/auth/corporate-login") ;
            }
            bcrypt.compare(password,corporate.password)
                .then( match => {
                    if( match ){
                        req.session.isLoggedIn = true ;
                        req.session.corporate = corporate ;
                        console.log("----> corporate logged in") ;
                        return req.session.save(err => {
                            console.log("-->" + err) ;
                            res.redirect("/corporate/corporate-console") ;
                        })
                    }
                    return res.redirect("/auth/corporate-login") ;
                } )
            } ) 
        .catch( err => {
            console.log(err) ;
        })
}
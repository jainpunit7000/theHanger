//PJ
const Seller = require("../models/seller");
const Buyer = require("../models/buyer") ;
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
                    // console.log("-->here3") ;
                    if( match ){
                        // console.log("-->here4") ;
                        req.session.isLoggedIn = true ;
                        req.session.buyer = buyer ;
                        console.log("----> Buyer is logged in") ;
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
                    console.log("----> new user created") ;
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
            // console.log("-->here1") ;
            if(!merchant){
                return res.redirect("/auth/merchant-login") ;
            }
            // console.log("-->here2") ;
            bcrypt.compare(password,merchant.password)
                .then( match => {
                    // console.log("-->here3") ;
                    if( match ){
                        // console.log("-->here4") ;
                        req.session.isLoggedIn = true ;
                        req.session.merchant = merchant ;
                        console.log("----> logged in") ;
                        return req.session.save(err => {
                            console.log("-->" + err) ;
                            res.redirect("/merchant-console") ;
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
    // console.log("----> in here") ;
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
            console.log("----> new Merchant acnt. Created") ;
            res.redirect("/auth/merchant-login") ;
        } )
        .catch( err => {
            console.log(err) ;
        })
}

exports.postLogout = (req, res, next) => {
    let isMerchant = true ;
    if( !req.session.merchant )
        isMerchant = false ;
    req.session.destroy(err => {
    console.log(err);
    if( isMerchant )
        res.redirect('/sell');
    else
        res.redirect("/shop") ;
    });
};
  
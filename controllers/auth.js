//PJ
const Seller = require("../models/seller");
const bcrypt = require("bcryptjs") ;
exports.getLogin = (req,res,next) => {
    res.render("user/auth/login",{
        pageTitle : 'Add-Product',
        path: "/login"
    })   
}
exports.postLogin = (req,res,next) => {
    res.render("user/home",{
        pageTitle : 'Add-Product',
        path: "/home"
    }) 
}
exports.getSignUp = (req,res,next) => {
    res.render("user/auth/sign-up",{
        pageTitle : 'Add-Product',
        path: "/sign-up"
    })   
}
exports.postSignUp = (req,res,next) => {
    res.render("user/home",{
        pageTitle : 'Add-Product',
        path: "/home"
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
                console.log("----> llll") ;
                return res.redirect("/merchant-signUp") ;
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

exports.postMerchantLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/sell');
    });
};
  
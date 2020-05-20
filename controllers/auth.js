const Seller = require("../models/seller");
const Buyer = require("../models/buyer") ;
const Corporate = require("../models/corporate") ;
const bcrypt = require("bcryptjs") ;

exports.getLogin = (req,res,next) => {
    res.render('user/auth/login', {
        pageTitle : 'Login',
        path : '/login'
    });
};

// exports.getLogin = (req,res,next) => {
//     res.render("user/auth/login",{
//         pageTitle : 'Login Please',
//         path: "/login"
//     })   
// }

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    Buyer.findOne({email : email})
    .then(buyer => {
        if(!buyer){
            return res.redirect('/auth/login');
        }
        bcrypt
            .compare(password,buyer.password)
            .then(match => {
                if(match){
                    req.session.isLoggedIn = true;
                    req.session.buyer = buyer;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/shop');
                    });
                }
                res.redirect('/auth/login');
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => console.log(err));
};

// exports.postLogin = (req,res,next) => {
//     const email = req.body.email ;
//     const password = req.body.password ;
//     Buyer.findOne({email:email})
//         .then( buyer => {
//             if( !buyer ){
//                 return res.redirect("/auth/login") ;
//             }
//             return bcrypt.compare(password,buyer.password)
//                 .then( match => {
//                     if( match ){
//                         req.session.isLoggedIn = true ;
//                         req.session.buyer = buyer ;
//                         console.log("----> Buyer logged in") ;
//                         // res.redirect()
//                         return req.session.save(err => {
//                             console.log("-->" + err) ;
//                             res.redirect("/shop") ;
//                         })
//                     }
//                     return res.redirect("/auth/login") ;
//                 } )
//         } )
//         .catch(err => {
//             console.log(err) ;
//         }) 
// }

exports.getSignUp = (req,res,next) => {
    res.render('user/auth/sign-up', {
        pageTitle : 'SignUp',
        path : '/sign-up'
    });
};

// exports.getSignUp = (req,res,next) => {
//     res.render("user/auth/sign-up",{
//         pageTitle : 'Add-Product',
//         path: "/sign-up"
//     })   
// }

exports.postSignUp = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.cPassword;
    Buyer.findOne({email : email})
    .then(buyer => {
        if(buyer){
            console.log('--> Buyer with same email exists');
            return res.redirect('/auth/signUp');
        }
        return bcrypt
            .hash(password,12)
            .then(hashedPassword => {
                const buyer = new Buyer({
                    email : email,
                    password : hashedPassword
                });
                return buyer.save()
            })
            .then(result => {
                console.log('---> new buyer created');
                res.redirect('/auth/login');
            });
    })
    .catch(err => {
        console.log(err);
    });
};


// exports.postSignUp = (req,res,next) => {
//     const email = req.body.email ;
//     const password = req.body.password ;
//     Buyer.findOne({email:email})
//         .then( buyer => {
//             if( buyer ){
//                 console.log("----> error failed") ;
//                 return res.redirect("/auth/signUp") ;
//             }
//             return bcrypt.hash(password,12)
//         })
//         .then( hashedPassword => {
//             if(hashedPassword){
//                 const byr = new Buyer({
//                     email : email,
//                     password : hashedPassword
//                 })
//                 return byr.save().then( result => {
//                     console.log("----> new Buyer created") ;
//                     res.redirect("/auth/login") ;
//                 })
//                 .catch( err => {
//                     console.log(err) ;
//                 })
//             }
//         } )
//         .catch( err => {
//             console.log(err) ;
//         })
// }

exports.getMerchantLogin = (req,res,next) => {
    res.render('merchant/auth/login', {
        pageTitle : 'MerchantLogin',
        path : '/merchant-login'
    });
};

// exports.getMerchantLogin = (req,res,next) => {
//     res.render("merchant/auth/login",{
//         pageTitle : 'Add-Product',
//         path: "/login"
//     }) 
// }

exports.postMerchantLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    Seller.findOne({email : email})
    .then(merchant => {
        if(!merchant){
            return res.redirect('/auth/merchant-login');
        }
        bcrypt
            .compare(password,merchant.password)
            .then(match => {
                if(match){
                    req.session.isLoggedIn = true;
                    req.session.merchant = merchant;
                    console.log('---> Merchant Logged In');
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/merchant-console');
                    })
                }
                return res.redirect('/auth/merchant-login');
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
        console.log(err);
    });
};

// exports.postMerchantLogin = (req,res,next) => {
//     const email = req.body.email ;
//     const password = req.body.password ;
//     Seller.findOne({email:email})
//         .then( merchant => {
//             if(!merchant){
//                 return res.redirect("/auth/merchant-login") ;
//             }
//             bcrypt.compare(password,merchant.password)
//                 .then( match => {
//                     if( match ){
//                         req.session.isLoggedIn = true ;
//                         req.session.merchant = merchant ;
//                         console.log("----> Merchant logged in") ;
//                         return req.session.save(err => {
//                             console.log("-->" + err) ;
//                             res.redirect("/merchant-console") ;
//                         })
//                     }
//                     return res.redirect("/auth/merchant-login") ;
//                 } )
//             } ) 
//         .catch( err => {
//             console.log(err) ;
//         })
// }

exports.getMerchantSignUp = (req,res,next) => {
    res.render('merchant/auth/sign-up', {
        pageTitle : 'Merchant SignUp',
        path : '/merchant-signUp'
    });
};

// exports.getMerchantSignUp = (req,res,next) => {
//     res.render("merchant/auth/sign-up",{
//         pageTitle : 'Add-Product',
//         path: "/sign-up"
//     })   
// }

exports.postMerchantSignUp = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.c-password;
    Seller.findOne({email : email})
    .then(merchant => {
        if(merchant){
            console.log('Email with same merchant exists');
            return res.redirect('/auth/merchant-signUp');
        }
        return bcrypt
                .hash(password,12)
                .then(hashedPassword => {
                    const merchant = new Seller({
                        email : email,
                        password : hashedPassword
                    });
                    return merchant.save();
                })
                .then(result => {
                    console.log('New Merchant Created!!');
                    res.redirect('/auth/merchant-login');
                })
                .catch(err => console.log(err));
    })
    .catch(err => {
        console.log(err);
    });
};

// exports.postMerchantSignUp = (req,res,next) => {
//     const email = req.body.email ;
//     const password = req.body.password ;
//     Seller.findOne({email:email})
//         .then( merchant => {
//             if( merchant ){
//                 return res.redirect("/auth/merchant-signUp") ;
//             }
//             return bcrypt.hash(password,12) ;
//         } )
//         .then( hashedPassword => {
//             const merchant = new Seller({
//                 email : email ,
//                 password : hashedPassword
//             })
//             return merchant.save()
//         } )
//         .then( result => {
//             console.log("----> new Merchant account Created") ;
//             res.redirect("/auth/merchant-login") ;
//         } )
//         .catch( err => {
//             console.log(err) ;
//         })
// }

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

// exports.postLogout = (req, res, next) => {
//     req.session.destroy(err => {
//         console.log(err);
//         res.redirect("/") ;
//     });
// };
  
exports.getCorporateSignUp = (req,res,next) => {
    res.render('corporate/auth/sign-up', {
        pageTitle : 'Corporate SignUp',
        path : 'corporate-signUp'
    });
};

// exports.getCorporateSignUp = (req,res,next) => {
//     res.render("corporate/auth/sign-up",{
//         pageTitle : "corporate governance sign up"
//     })
// }

exports.getCorporateLogin = (req,res,next) => {
    res.render('corporate/auth/login', {
        pageTitle : 'Corporate Login',
        path : 'corporate-login'
    });
};

// exports.getCorporateLogin = (req,res,next) => {
//     res.render("corporate/auth/login",{
//         pageTitle : "corporate governance login"
//     })
// }

exports.postCorporateSignUp = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = req.body.token;
    Corporate.findOne({email : email})
    .then(corporate => {
        if(corporate || token != '1A234'){
            return res.redirect('/auth/corporate-signup');
        }
        return bcrypt
                .hash(password,12)
                .then(hashedPassword => {
                    const corporate = new Corporate({
                        email : email,
                        password : hashedPassword,
                        product : {
                            acquired : [],
                            passed : []
                        }
                    });
                    return corporate.save();
                })
                .then(result => {
                    console.log('New Corporate Added!!');
                    res.redirect('auth/corporate-login');
                })
                .catch(err => console.log(errr));
    })
    .catch(err => {
        console.log(err);
    });
};

// exports.postCorporateSignUp = (req,res,next) => {
//     console.log("----> in post sign up") ;
//     const email = req.body.email ;
//     const password = req.body.password ;
//     const token = req.body.token ;
//     Corporate.findOne({email})
//         .then( corporate => {
//             if( corporate || token != "1A234" ){
//                 return res.redirect("/auth/corporate-signUp") ;
//             }
//             return bcrypt.hash(password,12) ;
//         } )
//         .then( hashedPassword => {
//             console.log("----> here") ;
//             const corporate = new Corporate({
//                 email : email ,
//                 password : hashedPassword,
//                 product : {
//                     acquired : [],
//                     passed : []
//                 }
//             })
//             return corporate.save()
//         } )
//         .then( result => {
//             console.log("----> new corporate account Created") ;
//             res.redirect("/auth/corporate-login") ;
//         } )
//         .catch( err => {
//             console.log(err) ;
//         })
// }

exports.postCorporateLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    Corporate.findOne({email : email})
    .then(corporate => {
        if(!corporate){
            return res.redirect('/auth/corporate-login');
        }
        bcrypt
            .compare(password,corporate.password)
            .then(match => {
                if(match){
                    req.session.isLoggedIn = true;
                    req.session.corporate = corporate;
                    console.log('---> Corporate Logged In');
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/corporate/corporate-console');
                    })
                }
                return res.redirect('/auth/corporate-login');
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
        console.log(err);
    });
};

// exports.postCorporateLogin = (req,res,next) => {
//     const email = req.body.email ;
//     const password = req.body.password ;
//     Corporate.findOne({email:email})
//         .then( corporate => {
//             if(!corporate){
//                 return res.redirect("/auth/corporate-login") ;
//             }
//             bcrypt.compare(password,corporate.password)
//                 .then( match => {
//                     if( match ){
//                         req.session.isLoggedIn = true ;
//                         req.session.corporate = corporate ;
//                         console.log("----> corporate logged in") ;
//                         return req.session.save(err => {
//                             console.log("-->" + err) ;
//                             res.redirect("/corporate/corporate-console") ;
//                         })
//                     }
//                     return res.redirect("/auth/corporate-login") ;
//                 } )
//             } ) 
//         .catch( err => {
//             console.log(err) ;
//         })
// }
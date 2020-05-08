exports.getHome = (req,res,next) => {
    res.render ( 'home' , {
        pageTitle : 'theHanger',
        path : '/home'
    }); 
};

// exports.getProductsShopMen = (req,res,next) => {
//     res.render ( 'products' , {
//         pageTitle : 'theHanger',
//         path : '/home'
//     }); 
// };
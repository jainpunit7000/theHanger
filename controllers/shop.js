exports.getHome = (req,res,next) => {
    res.render ( 'home' , {
        pageTitle : 'theHanger',
        path : '/home'
    }); 
};

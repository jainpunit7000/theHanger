const Product = require('../models/product');

exports.postAddProduct = (req,res,next) => {
    const title  = req.body.title;
    const price = req.body.price;
    const brand = req.body.brand;
    const desc = req.body.desc;
    const cat1 = req.body.cat1;
    const cat2 = req.body.cat2;
    const cat3 = req.body.cat3;
    const size38 = req.body.size38;
    const size40 = req.body.size40;
    const size42 = req.body.size42;
    const size44 = req.body.size44;
    const quan38 = req.body.quan38;
    const quan40 = req.body.quan40;
    const quan42 = req.body.quan42;
    const quan44 = req.body.quan44;
    // console.log(title);
    // console.log(price);
    // console.log(brand);
    // console.log(desc);
    // console.log(cat1);
    // console.log(cat2);
    // console.log(cat3);
    // console.log(size38);
    // console.log(size40);
    // console.log(size42);
    // console.log(size44);
    // console.log(quan38);
    // console.log(quan40);
    // console.log(quan42);
    // console.log(quan44);
    const product = new Product({
        title : title,
        price : price,
        desc : desc,
        brand : brand,
        cat1 : cat1,
        cat2 : cat2,
        cat3 : cat3,
        size38: size38,
        size44 : size44,
        size40: size40,
        size42 : size42,
        quan38 : quan38,
        quan40 : quan40,
        quan42 : quan42,
        quan44 : quan44,
    });
    product
    .save()
    .then(result => {
        console.log('Created Product');
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product',{
        pageTitle : 'Add-Product',
        path : '/add-product'
    });
};
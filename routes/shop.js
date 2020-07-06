const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

//home
router.get('/',shopController.getHome);

//shop and search
router.get("/shop",shopController.getShop);
router.post("/shop",shopController.postShop);

//single Product
router.get("/shop/product/:productId",shopController.getProduct);

// adding product to user bag
router.post("/shop/add-to-bag/:prodId",isAuth,shopController.postAddToBag) ;

// adding product to user wishlist
router.get("/shop/add-to-wishlist/:prodId",isAuth,shopController.postAddToWishlist) ;

// getting user wishlist
router.get("/user/wishlist",isAuth,shopController.getWishlist) ;

// getting user bag
router.get("/user/bag",isAuth,shopController.getBag) ;
router.get("/user/adress",isAuth,shopController.getAdress) ;
router.post("/user/orders",isAuth,shopController.getAdress) ;

// remove an item from user bag
router.get("/user/bag/remove/:bagId",isAuth,shopController.getRemoveFromBag) ;

// removing an item from user bag and adding it to wishlist
router.get("/user/bag/remove-and-add/:bagId",isAuth,shopController.getRemoveAndAdd) ;

// removing item form user wishlist
router.get("/shop/remWishlist/:prodId",isAuth,shopController.getRemoveFromWishlist) ;




// men-section
router.get("/shop/men",shopController.getProductsShopMen);

    //topwear
    router.get('men-topwear',shopController.getProductsMenTopWear);
    router.get('/men-tshirts',shopController.getProductsMenTshirts);
    router.get('/men-shirts',shopController.getProductsMenShirts);
    router.get('/men-sweaters',shopController.getProductsMenSweaters);
    router.get('/men-jackets',shopController.getProductsMenJackets);
    router.get('/men-sweatshirts',shopController.getProductsMenSweatshirts);

    //bottomwear
    router.get('/men-bottomwear',shopController.getProductsMenBottomWear);
    router.get('/men-jeans',shopController.getProductsMenJeans);
    router.get('/men-trousers',shopController.getProductsMenTrousers);
    router.get('/men-shorts',shopController.getProductsMenShorts);

    //footwear
    router.get('/men-footwear',shopController.getProductsMenFootWear);
    router.get('/men-casual-shoes',shopController.getProductsMenCasualShoes);
    router.get('/men-formals',shopController.getProductsMenFormals);
    router.get('/men-sports',shopController.getProductsMenSports);


//women-section - anurag
router.get('/shop/women',shopController.getProductsShopWomen);

    //westernwear
    router.get('/women-western',shopController.getProductsWomenWesternWear);
    router.get('/women-tops',shopController.getProductsWomenTops);
    router.get('/women-jeans',shopController.getProductsWomenJeans);
    router.get('/women-jackets-coats',shopController.getProductsWomenJacketsCoats);
    router.get('/women-shrugs',shopController.getProductsWomenShrugs);

    //indianwear
    router.get('/women-indian',shopController.getProductsWomenIndianWear);
    router.get('/women-kurtis',shopController.getProductsWomenKurtis);
    router.get('/women-lehengas',shopController.getProductsWomenLehengas);
    router.get('/women-sarees',shopController.getProductsWomenSarees);

    //footwear
    router.get('/women-footwear',shopController.getProductsWomenFootWear);    
    router.get('/women-boots',shopController.getProductsWomenBoots);    
    router.get('/women-flats',shopController.getProductsWomenFlats);    
    router.get('/women-heels',shopController.getProductsWomenHeels);    
    router.get('/women-casuals',shopController.getProductsWomenCasuals);    


//Kids section
router.get('/shop/kids',shopController.getProductsShopKids);

    //Boys-clothing
    router.get('/boys-clothing',shopController.getProductsBoysClothing);
    router.get('/boys-tshirts',shopController.getProductsBoysTshirts);
    router.get('/boys-shirts',shopController.getProductsBoysShirts);
    router.get('/boys-shorts',shopController.getProductsBoysShorts);
    router.get('/boys-jeans',shopController.getProductsBoysJeans);
    router.get('/boys-jackets',shopController.getProductsBoysJackets);

    //Boys-footwear
    router.get('/boys-footwear',shopController.getProductsBoysFootWear);
    router.get('/boys-casuals',shopController.getProductsBoysCasuals);
    router.get('/boys-sports',shopController.getProductsBoysSports);
    router.get('/boys-sandals',shopController.getProductsBoysSandals);

    //Girls-clothing
    router.get('/girls-clothing',shopController.getProductsGirlsClothing);    
    router.get('/girls-tops',shopController.getProductsGirlsTops);    
    router.get('/girls-tshirts',shopController.getProductsGirlsTshirts);    
    router.get('/girls-jeans',shopController.getProductsGirlsJeans);    
    router.get('/girls-jackets',shopController.getProductsGirlsJackets);    
    router.get('/girls-capris',shopController.getProductsGirlsCapris); 

    //Girls-footwear
    router.get('/girls-footwear',shopController.getProductsGirlsFootwear); 
    router.get('/girls-casuals',shopController.getProductsGirlsCasuals); 
    router.get('/girls-flip-flops',shopController.getProductsGirlsFlipFlops); 
    router.get('/girls-heels',shopController.getProductsGirlsHeels); 
    router.get('/girls-flats',shopController.getProductsGirlsFlats);


module.exports = router;
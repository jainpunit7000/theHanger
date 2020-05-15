const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String ,
        required : true 
    },
    wishlist : {
        items : [
            {
                productId : { type : Schema.Types.ObjectId , required : true,ref :'Product'}
            }
        ]
    },
    bag : {
        items : [
            {
                productId : {type : Schema.Types.ObjectId, required : true,ref:'Product'},
                quantity : {type : Number,required : true},
                size : {type : Number,required : true}
            }
        ]
    }
});

buyerSchema.methods.addToWishlist = function(product){
    const wishlistProductIndex = this.wishlist.items.findIndex(wp => {
        return wp.productId.toString() === product._id.toString();
    });
    const updatedWishlistItems = [...this.wishlist.items];
    if(wishlistProductIndex < 0){
        updatedWishlistItems.push({productId : product._id});
    }
    const updatedWishlist = { items : updatedWishlistItems };
    this.wishlist = updatedWishlist;
    return this.save();
};

buyerSchema.methods.removeFromWishlist = function(productId){
    const updatedWishlistItems = this.wishlist.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.wishlist.items = updatedWishlistItems;
    return this.save();
};

buyerSchema.methods.addToBag = function(product,size){
    const bagProductIndex = this.bag.items.findIndex(bp => {
        return ((bp.productId.toString() === product._id.toString()) && (bp.size == size));
    });
    let newQuantity = 1;
    const updatedBagItems = [...this.bag.items];
    if(bagProductIndex >= 0){
        newQuantity = this.bag.items[bagProductIndex].quantity + 1;
        updatedBagItems[bagProductIndex].quantity = newQuantity;
    }
    else{
        updatedBagItems.push({
            productId : product._id,
            quantity : newQuantity,
            size : size
        });
    }
    const updatedBag = {
        items : updatedBagItems
    };
    this.bag = updatedBag;
    return this.save();
}; 

buyerSchema.methods.removeFromBag = function(bagId){
    const updatedBagItems = this.bag.items.filter(item => {
        return item._id.toString() !== bagId.toString();
    });
    this.bag.items = updatedBagItems;
    return this.save();
};

buyerSchema.methods.moveToWishlist = function(bagId){
    let productId;
    const updatedBagItems = this.bag.items.filter(item => {
        if(item._id.toString() !== bagId.toString())
            return true;
        else{
            productId = item.productId;
            return false;
        } 
    });
    this.bag.items = updatedBagItems;
    const wishlistProductIndex = this.wishlist.items.findIndex(wp => {
        return wp.productId.toString() === productId.toString();
    });
    const updatedWishlistItems = [...this.wishlist.items];
    if(wishlistProductIndex < 0){
        updatedWishlistItems.push({productId : productId});
    }
    const updatedWishlist = { items : updatedWishlistItems };
    this.wishlist = updatedWishlist;
    return this.save();
};

module.exports = mongoose.model('Buyer',buyerSchema);
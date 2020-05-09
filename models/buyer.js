const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    wishlist : {
        items : [
            {
                productId : { type : Schema.Types.ObjectId , required : true}
            }
        ]
    },
    bag : {
        items : [
            {
                productId : {type : Schema.Types.ObjectId, required : true},
                quantity : {type : Number,required : true},
                size : {type : Number,required : true}
            }
        ]
    }
});

module.exports = mongoose.model('Buyer',buyerSchema);
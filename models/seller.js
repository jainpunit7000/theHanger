const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellerSchema = new Schema ({
    email: {
        type : String,
        required : true
    },
    password : {
        type:String,
        required : true
    },
    addedProducts : {
        items : [
            {
                productId : {
                    type:Schema.Types.ObjectId,
                    required : true
                },
                size : { 
                    type : Number,
                    required : true
                },
                quantity : {
                    type : Number,
                    required : true
                }
            }
        ]
    }
});

module.exports = mongoose.model('Seller',sellerSchema);
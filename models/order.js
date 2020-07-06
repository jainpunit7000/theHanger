const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products : [
        {
            product : { type : Object,required : true,ref : 'FinalProduct'},
            quantity : { type : Number,required : true},
            size : { type : String,required : true}
        }
    ],
    buyer : {
        name : {
            type : String,
            required : true
        },
        buyerId : {
            type : Schema.Types.ObjectId,
            required : true,
            ref : 'Buyer'
        },
        address : {
            type : String,
            required : true
        },
    }
});

module.exports = mongoose.model('Order',orderSchema);
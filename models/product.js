//pj
const mongoose = require("mongoose") ;

const Schema = mongoose.Schema;

const productSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        required : true 
    },
    title : {
        type : String,
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    imageUrl:{
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    desc : { 
        type : String,
        required : true
    },
    cat1 : {
        type : String,
        required : true
    },
    cat2 : {
        type : String,
        required : true
    },
    cat3 : {
        type : String,
        required : true
    },
    size:{
        size38 : {
            // isAvailable : { type : Boolean },
            quantity : {type : Number}
        },
        size40 : {
            // isAvailable : { type : Boolean },
            quantity : {type : Number}
        },
        size42 : {
            // isAvailable : { type : Boolean },
            quantity : {type : Number}
        },
        size44 : {
            // isAvailable : { type : Boolean },
            quantity : {type : Number}
        }
    },
    totalQuantity : {
        type : Number ,
        required : true
    }
});

module.exports = mongoose.model("Product",productSchema) ;
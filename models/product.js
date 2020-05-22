const mongoose = require("mongoose") ;

const Schema = mongoose.Schema;

const productSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref : "Seller" ,
        required : true 
    },
    title : {
        type : String,
        required : true,
    },
    price : {
        type: Number,
        required : true
    },
    imageUrl : {
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
    passedBy:{
        type : Schema.Types.ObjectId,
        ref : "Corporate"
    },
    status : {
        type :  String,
        default : "Pending" 
    }
});

module.exports = mongoose.model("Product",productSchema) ;
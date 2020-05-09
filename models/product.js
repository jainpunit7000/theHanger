const mongoose = require("mongoose") ;

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    price : {
        type: Number,
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
    size38 : {
        type : Boolean,
        default : false
    },
    size40 : {
        type : Boolean,
        default : false
    },
    size42 : {
        type : Boolean,
        default : false
    },
    size44 : {
        type : Boolean,
        default : false
    },
    quan38 : {
        type : Number
    },
    quan40 : {
        type : Number
    },
    quan42 : {
        type : Number
    },
    quan44 : {
        type : Number
    }
});

module.exports = mongoose.model("Product",productSchema) ;
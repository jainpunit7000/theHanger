//pj
const mongoose = require("mongoose") ;

const Schema = mongoose.Schema;

const corporateSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String ,
        required : true 
    },
    products : {
        accepted : [
            {
                productId : {
                    type : Schema.Types.ObjectId,
                    required : true,
                    ref:'Product'
                },
                dateUpdated : {
                    type : Date,
                    default : Date.now
                }
            }
        ],
        passed : [
            {
                productId : {type : Schema.Types.ObjectId, required : true,ref:'FinalProduct'},
                dateUpdated : {
                    type : Date,
                    default : Date.now
                }
            }
        ]
    }
});

module.exports = mongoose.model("Corporate",corporateSchema) ;
var mongoose = require("mongoose");

var schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new schema({
    userId:{
        type:ObjectId,
        required:true
    },
    orderedItems:[
        {
            foodName:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    outletId:{
        type:ObjectId,
        required:true
    }
});

module.exports = mongoose.model("order",orderSchema);
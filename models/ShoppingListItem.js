const mongoose = require("mongoose")


// ShoppingListItem schema with validation
const ShoppingListItemSchema = new mongoose.Schema({

    name: {
        type:String, 
        required:[true, "Must provide item name"],
    },
    quantity: {
        type: Number,
        required:[true, "Must provide item quantity"]
    },
    isDone: {
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model("ShoppingListItem", ShoppingListItemSchema)

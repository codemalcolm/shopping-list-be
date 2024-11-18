const mongoose = require("mongoose")
const ShoppingListItemSchema = require("./ShoppingListItem")

// ShoppingList schema with validation
const ShoppingListSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true, "Must provide name"], 
        trim:true,   
        maxLength:[30, "Name can't be more than 30 characters"]
    },
    state: {
        type: String,
        default:"active"
    },
    owner: String,
    memberList: [String],
    itemList: [ShoppingListItemSchema],
    isDone:{
        type:Boolean,
        default:false
    },
    isArchived:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("ShoppingList", ShoppingListSchema)
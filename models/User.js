const mongoose = require("mongoose")

// ShoppingListItem schema with validation
const UserSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:[true, "Must provide a username"],
    },
})

module.exports = {UserSchema}
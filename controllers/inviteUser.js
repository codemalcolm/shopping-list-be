const asyncWrapper = require("../middleware/async")

const inviteUser = asyncWrapper(async(req,res) =>{
 res.send(`You are visiting the shoppinglist/:id/inviteUser/post route for ShoppingList ID: ${req.params.id} and User ID: ${req.params.userId}`)
})

module.exports = {inviteUser}
const asyncWrapper = require("../middleware/async")

const createShoppingList = asyncWrapper(async (req, res) => {
    const shoppingList = req.body
    console.log(shoppingList)
    res.status(201).json(shoppingList)
})

const getAllShoppingLists = asyncWrapper(async (req,res) => {
    const shoppingLists = await req.body
    res.status(201).json(shoppingLists)
})

module.exports = {createShoppingList, getAllShoppingLists}
const asyncWrapper = require("../middleware/async")

// ITEMS

const createItem = asyncWrapper(async (req, res) => {
    res.send("You are visiting the shoppinglist/item/create route")
})

const getItems = asyncWrapper(async (req, res) => {
    res.send("You are visiting the shoppinglist/item/get route")
})

const editItem = asyncWrapper(async(req, res) => {
    const { id: taskID } = req.params;
    res.send(`You are visiting the shoppinglist/item/edit route with ID: ${req.params.id}`)
})

const deleteItem = asyncWrapper(async(req, res) => {
    const { id: taskID } = req.params;
    res.send(`You are visiting the shoppinglist/item/delete route with ID: ${req.params.id}`)
})



module.exports = {createItem, getItems, editItem, deleteItem}
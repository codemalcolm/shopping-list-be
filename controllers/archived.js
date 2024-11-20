const asyncWrapper = require("../middleware/async")

const createArchivedItem = asyncWrapper(async(req, res) => {
    res.send("You are visiting the shoppinglist/archived/create route")
})

const getArchivedItems = asyncWrapper(async(req, res) => {
    res.send("You are visiting the shoppinglist/archived/get route")
})

const deleteArchivedItem = asyncWrapper(async(req, res) => {
    res.send(`You are visiting the shoppinglist/archived/delete route with ID: ${req.params.id}`)
})

module.exports = {createArchivedItem, getArchivedItems, deleteArchivedItem}
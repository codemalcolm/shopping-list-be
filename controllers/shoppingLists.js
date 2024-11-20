const asyncWrapper = require("../middleware/async")


// SHOPPING LISTS

const createShoppingList = asyncWrapper(async (req, res) => {
    const shoppingList = req.body
    console.log(shoppingList)
    res.status(201).json(shoppingList)
})

const getAllShoppingLists = asyncWrapper(async (req,res) => {
    const shoppingLists = await req.body
    res.status(201).json(shoppingLists)
})

const editShoppingList = asyncWrapper(async (req,res)=>{
    const { id: taskID } = req.params;
    res.status(201).json(req.body)
})

const deleteShoppingList = asyncWrapper(async (req,res)=>{
    const { id: taskID } = req.params;
    res.status(201).json({
        success : "ok",
        deletedDoc: req.body
    })
})

const getSingleShoppingList = asyncWrapper(async (req,res)=>{
    const { id: taskID } = req.params;
    res.status(201).json(req.body)
})


module.exports = {createShoppingList, getAllShoppingLists, editShoppingList, deleteShoppingList, getSingleShoppingList,}
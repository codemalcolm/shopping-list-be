const asyncWrapper = require("../middleware/async")


// SHOPPING LISTS

const createShoppingList = asyncWrapper(async (req, res) => {
    const { name, owner, memberList, itemList } = req.body;

    const processedItems = itemList.map((item) => ({
        ...item,
        isDone: item.isDone || false, // Setting isDone to false if not provided
      }));

    const shoppingList = {
        name,
        state: "active", // Default value
        owner,
        memberList,
        itemList: processedItems,
        isDone: false, // Default value
        isArchived: false // Default value
      };

    res.status(201).json({
        message: "Shopping list created successfully",
        data: shoppingList
      });
})

const getAllShoppingLists = asyncWrapper(async (req,res) => {
    const shoppingLists = await req.body
    res.status(201).json("getAllShoppingLists")
})

const editShoppingList = asyncWrapper(async (req,res)=>{
    const { id: taskID } = req.params;
    res.status(201).json("editShoppingList")
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
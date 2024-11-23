const asyncWrapper = require("../middleware/async")

// ITEMS

const createItem = asyncWrapper(async (req, res) => {
    const { name, quantity } = req.body;
    const { shoppingList } = req; // Access the shopping list from authorizeOwner middleware
  
    // Create the new item
    const newItem = {
      id: `itemId${Math.floor(Math.random() * 1000)}`, // Mock ID generation
      name,
      quantity,
      isDone: false, // Default value
    };
  
    // Add the item to the shopping list
    shoppingList.itemList.push(newItem);
  
    res.status(201).json({
      message: "Item created successfully",
      data: newItem,
      updatedShoppingList: shoppingList
    });
  });

  const getItems = asyncWrapper(async (req, res) => {
    const { shoppingList } = req; // Access the shopping list from authorizeOwner middleware
  
    res.status(200).json({
      message: "Items fetched successfully",
      data: shoppingList.itemList,
    });
  });

  const editItem = asyncWrapper(async (req, res) => {
    const { name, quantity, isDone } = req.body;
    const { shoppingList } = req; // Access the shopping list from authorizeOwner middleware
    const { id } = req.params;
    console.log(id)
  
    // Find the item to edit
    const item = shoppingList.itemList.find((item) => item.id === id);
  
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        requestedId: id,
      });
    }
  
    // Updating the item
    if (name) item.name = name;
    if (quantity) item.quantity = quantity;
    if (typeof isDone === "boolean") item.isDone = isDone;
  
    res.status(200).json({
      message: "Item updated successfully",
      data: item,
      updatedShoppingList: shoppingList
    });
  });

  const deleteItem = asyncWrapper(async (req, res) => {
    const { shoppingList } = req; // Access the shopping list from authorizeOwner middleware
    const { id } = req.params;
  
    // Find the index of the item to delete
    const itemIndex = shoppingList.itemList.findIndex((item) => item.id === id);
  
    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found",
        requestedId: id,
      });
    }

    const deletedItem = shoppingList.itemList.splice(itemIndex, 1);
  
    res.status(200).json({
      message: "Item deleted successfully",
      data: deletedItem[0],
      updatedShoppingList: shoppingList
    });
  });


module.exports = {createItem, getItems, editItem, deleteItem}
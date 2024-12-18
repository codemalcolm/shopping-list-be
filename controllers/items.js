const asyncWrapper = require("../middleware/async");
const ShoppingList = require("../models/ShoppingList");

// ITEMS

const createItem = asyncWrapper(async (req, res) => {
	const { listId } = req.params;
	const { name, quantity } = req.body; // Access the name and quantity vars from body

	// Create the new item
	const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
		{ _id: listId },
		{ $push: { itemList: { name, quantity, isDone: false } } }, // Add the item to the shopping list
		{ new: true, runValidators: true }
	);

	// Shopping list was not found
	if (!updatedShoppingList) {
		res.status(404).json({
			error: "Shopping list not found",
			requestedId: listId,
		});
	}

	res.status(201).json({
		message: "Item created successfully",
		updatedShoppingList: updatedShoppingList,
	});
});

const getItems = asyncWrapper(async (req, res) => {
	const { listId } = req.params;

	// Find items by shopping list id
	const items = await ShoppingList.find(
		{ _id: listId },
		{ itemList: 1, _id: 0 } // Show only itemList arr and exlude the shoppingList id
	);

	// Shopping list was not found
	if (!items) {
		res.status(404).json({
			error: "Shopping list not found",
			requestedId: listId,
		});
	}

	res.status(201).json({
		message: "Items fetched successfully",
		items: items,
	});
});

const editItem = asyncWrapper(async (req, res) => {
	const { listId } = req.params;
	const { id } = req.params;

	const { name, quantity, isDone } = req.body;
	const updatedFields = {
		name,
		quantity,
		isDone,
	};

	// Find the item to edit
	const updatedItemList = await ShoppingList.findOneAndUpdate(
		{ _id: listId, "itemList._id": id },
		{
			$set: {
				"itemList.$.name": updatedFields.name,
				"itemList.$.quantity": updatedFields.quantity,
				"itemList.$.isDone": updatedFields.isDone,
			},
		},
		{ new: true, runValidators: true }
	);

	if (!updatedItemList) {
		res.status(404).json({
			error: "Shopping list not found",
			requestedId: listId,
		});
	}

	res.status(200).json({
		message: "Item updated successfully",
		updatedItemList: updatedItemList, //s
	});
});

const deleteItem = asyncWrapper(async (req, res) => {
	const { listId } = req.params;
	const { id } = req.params;
  let deletedItem = null

	// Find the shopping list and the item to delete
	await ShoppingList.findOneAndUpdate(
		{ _id: listId },
		deletedItem = { $pull: { itemList: { _id: id } } },
		{ new: true }
	);

	res.status(200).json({
		message: "Item deleted successfully",
    deletedItem:deletedItem
	});
});

module.exports = { createItem, getItems, editItem, deleteItem };

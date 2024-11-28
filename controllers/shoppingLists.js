const asyncWrapper = require("../middleware/async");
const ShoppingList = require("../models/ShoppingList");

// SHOPPING LISTS

const createShoppingList = asyncWrapper(async (req, res) => {
	const userId = req.user.id;
	console.log(req.user);
	const { name, owner, memberList, itemList } = req.body;

	const processedItems = itemList.map((item) => ({
		...item,
		isDone: item.isDone || false, // Setting isDone to false if not provided
	}));

	const shoppingListObj = {
		name,
		state: "active", // Default value
		owner: userId,
		memberList,
		itemList: processedItems ? processedItems : [],
		isDone: false, // Default value
		isArchived: false, // Default value
	};

	const shoppingList = await ShoppingList.create(shoppingListObj);

	res.status(201).json({
		message: "Shopping list created successfully",
		data: shoppingList,
	});
});

const getAllShoppingLists = asyncWrapper(async (req, res) => {
	const userId = req.user.id;

	const shoppingLists = await ShoppingList.find({
		$or: [{ owner: userId }, { memberList: userId }],
	}).exec();

	res.status(201).json({
		message: "Shopping list fetched successfully.",
		fetchedLists: shoppingLists,
	});
});

const editShoppingList = asyncWrapper(async (req, res) => {
	let { id: listId } = req.params;
	listId = listId.trim();

	const shoppingList = await ShoppingList.findOneAndUpdate(
		{ _id: listId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		message: "Shopping list updated successfully.",
		updatedDocument: shoppingList,
	});
});

const deleteShoppingList = asyncWrapper(async (req, res) => {
	let { id: listId } = req.params;
	listId = listId.trim();

	const shoppingList = await ShoppingList.findOneAndDelete({ _id: listId });

	if (!shoppingList) {
		res.status(404).json({
			message: "Couldn't find list",
			requestedId: listId,
		});
		return;
	}

	res.status(200).json({
		message: "Shopping list deleted successfully.",
		deletedShoppingList: shoppingList,
	});
});

const getSingleShoppingList = asyncWrapper(async (req, res) => {
	let { id: listId } = req.params;
	listId = listId.trim();
	const singleList = await ShoppingList.findById({ _id: listId });

	!singleList
		? res
				.status(404)
				.json({ message: "Shopping list not found", requestedId: listId })
		: res.status(201).json({
				message: "Shopping list fetched successfully",
				fetchedDocument: singleList,
		  });
});

module.exports = {
	createShoppingList,
	getAllShoppingLists,
	editShoppingList,
	deleteShoppingList,
	getSingleShoppingList,
};

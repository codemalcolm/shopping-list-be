const asyncWrapper = require("../middleware/async");

// SHOPPING LISTS

const shoppingListsMock = [
	{
		id: "shoppingListId1",
		name: "Weekly Groceries",
		state: "active",
		owner: "userId101",
		memberList: ["userId102", "userId103"],
		itemList: [
			{
				id: "itemId101",
				name: "Milk",
				quantity: 2,
				isDone: false,
			},
			{
				id: "itemId102",
				name: "Bread",
				quantity: 1,
				isDone: false,
			},
		],
		isDone: false,
		isArchived: false,
	},
	{
		id: "shoppingListId2",
		name: "Party Supplies",
		state: "archived",
		owner: "userId201",
		memberList: ["userId202", "userId203"],
		itemList: [
			{
				id: "itemId201",
				name: "Chips",
				quantity: 3,
				isDone: true,
			},
			{
				id: "itemId202",
				name: "Soda",
				quantity: 6,
				isDone: false,
			},
		],
		isDone: true,
		isArchived: false,
	},
	{
		id: "shoppingListId3",
		name: "Home Renovation",
		state: "active",
		owner: "userId301",
		memberList: ["userId302"],
		itemList: [
			{
				id: "itemId301",
				name: "Paint",
				quantity: 10,
				isDone: false,
			},
			{
				id: "itemId302",
				name: "Brushes",
				quantity: 5,
				isDone: false,
			},
		],
		isDone: false,
		isArchived: true,
	},
	{
		id: "shoppingListId4",
		name: "Monthly Essentials",
		state: "active",
		owner: "userId401",
		memberList: [],
		itemList: [
			{
				id: "itemId401",
				name: "Toilet Paper",
				quantity: 12,
				isDone: false,
			},
			{
				id: "itemId402",
				name: "Dish Soap",
				quantity: 2,
				isDone: false,
			},
		],
		isDone: false,
		isArchived: false,
	},
	{
		id: "shoppingListId5",
		name: "Camping Trip",
		state: "archived",
		owner: "userId501",
		memberList: ["userId502", "userId503"],
		itemList: [
			{
				id: "itemId501",
				name: "Tent",
				quantity: 1,
				isDone: true,
			},
			{
				id: "itemId502",
				name: "Sleeping Bags",
				quantity: 4,
				isDone: true,
			},
		],
		isDone: true,
		isArchived: true,
	},
	{
		id: "shoppingListId6",
		name: "Wedding Supplies",
		state: "active",
		owner: "userId601",
		memberList: ["userId602", "userId603", "userId604"],
		itemList: [
			{
				id: "itemId601",
				name: "Flowers",
				quantity: 20,
				isDone: false,
			},
			{
				id: "itemId602",
				name: "Candles",
				quantity: 15,
				isDone: true,
			},
		],
		isDone: false,
		isArchived: false,
	},
	{
		id: "shoppingListId7",
		name: "Birthday Party",
		state: "active",
		owner: "userId701",
		memberList: ["userId702"],
		itemList: [
			{
				id: "itemId701",
				name: "Cake",
				quantity: 1,
				isDone: false,
			},
			{
				id: "itemId702",
				name: "Balloons",
				quantity: 50,
				isDone: false,
			},
		],
		isDone: false,
		isArchived: false,
	},
	{
		id: "shoppingListId8",
		name: "Pet Supplies",
		state: "active",
		owner: "userId801",
		memberList: [],
		itemList: [
			{
				id: "itemId801",
				name: "Dog Food",
				quantity: 3,
				isDone: false,
			},
			{
				id: "itemId802",
				name: "Cat Litter",
				quantity: 2,
				isDone: false,
			},
		],
		isDone: false,
		isArchived: false,
	},
	{
		id: "shoppingListId9",
		name: "Office Supplies",
		state: "archived",
		owner: "userId901",
		memberList: ["userId902"],
		itemList: [
			{
				id: "itemId901",
				name: "Pens",
				quantity: 10,
				isDone: true,
			},
			{
				id: "itemId902",
				name: "Notebooks",
				quantity: 5,
				isDone: true,
			},
		],
		isDone: true,
		isArchived: true,
	},
	{
		id: "shoppingListId10",
		name: "Fitness Supplies",
		state: "active",
		owner: "userId1001",
		memberList: [],
		itemList: [
			{
				id: "itemId1001",
				name: "Yoga Mat",
				quantity: 1,
				isDone: false,
			},
			{
				id: "itemId1002",
				name: "Dumbbells",
				quantity: 2,
				isDone: false,
			},
		],
		isDone: false,
		isArchived: false,
	},
];

const createShoppingList = asyncWrapper(async (req, res) => {
	const { name, owner, memberList, itemList } = req.body;

	const processedItems = itemList.map((item) => ({
		...item,
		isDone: item.isDone || false, // Setting isDone to false if not provided
	}));

	const shoppingList = {
        id: `shoppingListId${Math.floor(Math.random() * 1000)}`,
		name,
		state: "active", // Default value
		owner,
		memberList,
		itemList: processedItems ? processedItems : [],
		isDone: false, // Default value
		isArchived: false, // Default value
	};

	res.status(201).json({
		message: "Shopping list created successfully",
		data: shoppingList,
	});
});

const getAllShoppingLists = asyncWrapper(async (req, res) => {
	const shoppingLists = shoppingListsMock;
	res
		.status(201)
		.json({
			message: "Shopping list fetched successfully.",
			fetchedLists: shoppingLists,
		});
});

const editShoppingList = asyncWrapper(async (req, res) => {
	const { shoppingList } = req; // Access the shopping list from authorizeOwner middleware
	const { name, state, isDone, isArchived } = req.body;

	// Update the list properties if provided in the request body
	if (name) shoppingList.name = name;
	if (state) shoppingList.state = state;
	if (typeof isDone !== "undefined") shoppingList.isDone = isDone;
	if (typeof isArchived !== "undefined") shoppingList.isArchived = isArchived;

	res.status(200).json({
		message: "Shopping list updated successfully.",
		updatedDocument: shoppingList,
	});
});

const deleteShoppingList = asyncWrapper(async (req, res) => {
	const { shoppingList } = req; // Access the shopping list from authorizeOwner middleware

	const index = shoppingListsMock.findIndex(
		(list) => list.id === shoppingList.id
	);

	// Removing the shopping list from the mocked db (shoppingListsMock)
	const [deletedList] = shoppingListsMock.splice(index, 1);

	res.status(200).json({
		message: "Shopping list deleted successfully.",
		deletedDocument: deletedList,
	});
});

const getSingleShoppingList = asyncWrapper(async (req, res) => {
	const { id: listId } = req.params;
	const singleList = shoppingListsMock.filter((list) => list.id === listId);

	singleList.length === 0
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

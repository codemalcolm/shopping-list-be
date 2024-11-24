const asyncWrapper = require("../middleware/async");

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
		state: "archived",
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

const getArchivedItems = asyncWrapper(async (req, res) => {
	const userId = req.user.id;

	// filtering archived shopping lists where the user is the owner
	const archivedLists = shoppingListsMock.filter(
		(list) => list.owner === userId && list.state === "archived"
	);

	res.status(200).json({
		message: "Archived shoppinglists fetched successfully",
		count: archivedLists.length,
		data: archivedLists,
	});
});

const deleteArchivedItem = asyncWrapper(async (req, res) => {
	const { id } = req.params;

	const archivedIndex = shoppingListsMock.findIndex(
		(list) => list.id === id && list.state === "archived"
	);

	if (archivedIndex === -1) {
		return res
			.status(404)
			.json({ message: "Shopping list not found", requestedId: listId 
        });
	}

	// removing archived shopping list from the array
	const deletedItem = shoppingListsMock.splice(archivedIndex, 1);

	res.status(200).json({
		message: "Archived shopping list has been deleted",
		deletedItem: deletedItem[0],
	});
});

module.exports = { getArchivedItems, deleteArchivedItem };

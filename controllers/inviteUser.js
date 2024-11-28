const asyncWrapper = require("../middleware/async");
const ShoppingList = require("../models/ShoppingList");
const userList = [
	{ id: "userId101", name: "John Doe" },
	{ id: "userId102", name: "Jane Smith" },
	{ id: "userId103", name: "Alice Johnson" },
	{ id: "userId201", name: "Bob Brown" },
	{ id: "userId202", name: "Charlie Davis" },
	{ id: "userId203", name: "Emily White" },
	{ id: "userId301", name: "Frank Harris" },
	{ id: "userId302", name: "Grace Wilson" },
	{ id: "userId401", name: "Henry Moore" },
	{ id: "userId501", name: "Isabella Scott" },
	{ id: "userId502", name: "Jack Taylor" },
	{ id: "userId503", name: "Karen Martinez" },
	{ id: "userId601", name: "Laura Anderson" },
	{ id: "userId602", name: "Michael Thomas" },
	{ id: "userId603", name: "Nancy Lee" },
	{ id: "userId604", name: "Oscar Martin" },
	{ id: "userId701", name: "Paul Walker" },
	{ id: "userId702", name: "Rachel Adams" },
	{ id: "userId801", name: "Sarah Lewis" },
	{ id: "userId901", name: "Thomas Hall" },
	{ id: "userId902", name: "Uma Clark" },
	{ id: "userId1001", name: "Victor Young" },
];

const addUser = asyncWrapper(async (req, res) => {
	const { id, userId } = req.params;

	// Check if user exists
	const userExists = userList.some((user) => user.id === userId);
	if (!userExists) {
		return res.status(404).json({
			error: "User Not Found",
			requestedUser: userId,
		});
	}

    // Check if user is already a member
    const shoppingList = await ShoppingList.findOne({_id : id, memberList: userId})

    if (shoppingList) {
        return res.status(400).json({
            error: "Bad Request",
            message: `User with ID: ${userId} is already a member of this shopping list.`,
        });
    }
    
	// Add user to the memberList
	const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
		{ _id: id },
		{ $push: { memberList: userId }}, // Add the userId into the memberList arr
		{ new: true, runValidators: true }
	);

    if (!updatedShoppingList) {
        return res.status(400).json({
            error: "Shopping List not found",
            requestedShoppingList: id,
        });
    }

	// Send response
	res.status(200).json({
		message: `User with ID: ${userId} has been added to the shopping list with ID: ${id}.`,
		updatedShoppingList: updatedShoppingList,
	});
});

module.exports = { addUser };

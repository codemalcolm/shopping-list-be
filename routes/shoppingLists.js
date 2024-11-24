const express = require("express");
const router = express.Router();

// controllers
const {
	createShoppingList,
	getAllShoppingLists,
	editShoppingList,
	deleteShoppingList,
	getSingleShoppingList,
} = require("../controllers/shoppingLists");
const {
	createItem,
	getItems,
	editItem,
	deleteItem,
} = require("../controllers/items");
const {
	getArchivedItems,
	deleteArchivedItem,
} = require("../controllers/archived");
const { addUser } = require("../controllers/inviteUser");

// middleware
const {
	validateShoppingList,
	validateShoppingListItem,
} = require("../middleware/validate");
const { authorizeOwner, authorizeAccess, authorizeOwnerArchived } = require("../middleware/authorize");

// Invite User
router
	.route("/:id/addUser/:userId") // shoppinglist/:id/addUser/:userId in uuDocs
	.post(authorizeOwner, addUser);

// Archived
router
	.route("/archived")
	.get(authorizeOwnerArchived, getArchivedItems); // shoppinglist/archived/get in uuDocs

router
	.route("/archived/:id")
	.delete(authorizeOwner, deleteArchivedItem); // shoppinglist/archived/:id/delete in uuDocs

// Shopping lists
router
	.route("/")
	.post(validateShoppingList, createShoppingList) // shopppinglist/create in uuDocs
	.get(getAllShoppingLists); // shopppinglist/get in uuDocs

router
	.route("/:id")
	.get(authorizeAccess, getSingleShoppingList) // shoppinglist/getOne in uuDocs
	.put(authorizeOwner, validateShoppingList, editShoppingList) // shoppinglist/edit in uuDocs
	.delete(authorizeOwner, deleteShoppingList); // shoppinglist/delete in uuDocs

// Items

router
	.route("/:shoppingListId/item")
	.post(authorizeAccess, validateShoppingListItem, createItem) // shoppinglist/:shoppingListId/item/create in uuDocs
	.get(authorizeAccess, getItems); // shoppinglist/:shoppingListId/item/get in uuDocs

router
	.route("/:shoppingListId/item/:id")
	.put(authorizeAccess, validateShoppingListItem, editItem) // shoppinglist/:shoppingListId/item/:id/edit in uuDocs
	.delete(authorizeAccess, deleteItem); // shoppinglist/:shoppingListId/item/:id/delete in uuDocs


module.exports = router;

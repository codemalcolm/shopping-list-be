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
	createArchivedItem,
	getArchivedItems,
	deleteArchivedItem,
} = require("../controllers/archived");
const { inviteUser } = require("../controllers/inviteUser");

// middleware
const { validateShoppingList, validateShoppingListItem } = require("../middleware/validate");
const { authorizeOwner, authorizeAccess } = require("../middleware/authorize");

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
  .post(authorizeAccess, validateShoppingListItem,createItem) // shoppinglist/item/create in uuDocs
	.get(authorizeAccess, getItems); // shoppinglist/item/get in uuDocs

router
	.route("/:shoppingListId/item/:id")
	.put(authorizeAccess,validateShoppingListItem, editItem) // shoppinglist/item/edit in uuDocs
	.delete(authorizeAccess, deleteItem) // shoppinglist/item/delete in uuDocs


// Archived
router
	.route("/archived")
	.post(authorizeOwner, createArchivedItem) // shoppinglist/archived/create in uuDocs
	.get(authorizeOwner, getArchivedItems); // shoppinglist/archived/get in uuDocs

router.route("/archived/:id").delete(authorizeOwner, deleteArchivedItem); // shoppinglist/archived/delete in uuDocs

// Invite User
router
	.route("/:id/inviteUser/:userId") // shoppinglist/:id/inviteUser/post in uuDocs
	.post(authorizeOwner, inviteUser);

module.exports = router;

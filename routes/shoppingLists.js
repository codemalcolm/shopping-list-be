const express = require("express")
const router = express.Router()

// controllers
const {createShoppingList, getAllShoppingLists, editShoppingList, deleteShoppingList, getSingleShoppingList} = require("../controllers/shoppingLists")
const {createItem, getItems, editItem, deleteItem} = require("../controllers/items")
const {createArchivedItem, getArchivedItems, deleteArchivedItem} = require("../controllers/archived")
const {inviteUser} = require("../controllers/inviteUser")

// Shopping lists
router.route("/")
  .post(createShoppingList) // shopppinglist/create in uuDocs
  .get(getAllShoppingLists); // shopppinglist/get in uuDocs

router.route("/:id")
  .get(getSingleShoppingList)
  .put(editShoppingList) // shoppinglist/edit in uuDocs
  .delete(deleteShoppingList); // shoppinglist/delete in uuDocs

// Items
router.route("/item")
  .post(createItem) // shoppinglist/item/create in uuDocs
  .get(getItems); // shoppinglist/item/get in uuDocs

router.route("/item/:id")
  .put(editItem)  // shoppinglist/item/edit in uuDocs
  .delete(deleteItem); // shoppinglist/item/delete in uuDocs

// Archived
router.route("/archived")
  .post(createArchivedItem)  // shoppinglist/archived/create in uuDocs
  .get(getArchivedItems); // shoppinglist/archived/get in uuDocs

router.route("/archived/:id")
  .delete(deleteArchivedItem); // shoppinglist/archived/delete in uuDocs

// Invite User
router.route("/:id/inviteUser/:userId") // shoppinglist/:id/inviteUser/post in uuDocs
  .post(inviteUser)
  

module.exports = router
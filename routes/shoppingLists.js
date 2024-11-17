const express = require("express")
const router = express.Router()

// getting controllers from "controllers/shoppingLists"


// //shoppinglists
// router.route("/").post()         // shoppinglist/create in uuDocs
// router.route("/").get()          // shoppinglist/get in uuDocs
// router.route("/:id").put()      // shoppinglist/edit in uuDocs
// router.route("/:id").delete()   // shoppinglist/delete in uuDocs

// // items
// router.route("/item").post()        // shoppinglist/item/create in uuDocs
// router.route("/item").get()         // shoppinglist/item/get in uuDocs
// router.route("/item/:id").put()     // shoppinglist/item/edit in uuDocs
// router.route("/item/:id").delete()  // shoppinglist/item/delete in uuDocs

// // archived
// router.route("/archived").post()        // shoppinglist/archived/create in uuDocs
// router.route("/archived").get()         // shoppinglist/archived/get in uuDocs
// router.route("/archived/:id").delete()  // shoppinglist/archived/delete in uuDocs

// // inviteUser
// router.route("/:id/inviteUser/:id").post()  // shoppinglist/:id/inviteUser/post in uuDocs

// Shopping lists
router.route("/")
  .post((req, res) => res.send("You are visiting the shoppinglist/create route"))
  .get((req, res) => res.send("You are visiting the shoppinglist/get route"));

router.route("/:id")
  .put((req, res) => res.send(`You are visiting the shoppinglist/edit route with ID: ${req.params.id}`))
  .delete((req, res) => res.send(`You are visiting the shoppinglist/delete route with ID: ${req.params.id}`));

// Items
router.route("/item")
  .post((req, res) => res.send("You are visiting the shoppinglist/item/create route"))
  .get((req, res) => res.send("You are visiting the shoppinglist/item/get route"));

router.route("/item/:id")
  .put((req, res) => res.send(`You are visiting the shoppinglist/item/edit route with ID: ${req.params.id}`))
  .delete((req, res) => res.send(`You are visiting the shoppinglist/item/delete route with ID: ${req.params.id}`));

// Archived
router.route("/archived")
  .post((req, res) => res.send("You are visiting the shoppinglist/archived/create route"))
  .get((req, res) => res.send("You are visiting the shoppinglist/archived/get route"));

router.route("/archived/:id")
  .delete((req, res) => res.send(`You are visiting the shoppinglist/archived/delete route with ID: ${req.params.id}`));

// Invite User
router.route("/:id/inviteUser/:userId")
  .post((req, res) => res.send(`You are visiting the shoppinglist/:id/inviteUser/post route for ShoppingList ID: ${req.params.id} and User ID: ${req.params.userId}`));

module.exports = router
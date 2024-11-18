const Joi = require("join")

// API layer validation for shoppingListItem
const shoppingListItemValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Item name is required",
    }),
    quantity: Joi.number().required().messages({
        "number.base": "Quantity must be a number",
        "any.required": "Item quantity is required",
    }),
    isDone: Joi.boolean().default(false),
});

// API layer validation for shoppingList
const shoppingListValidationSchema = Joi.object({
    name: Joi.string().trim().max(30).required().messages({
        "string.empty": "Shopping list name is required",
        "string.max": "Shopping list name can't be more than 30 characters",
    }),
    state: Joi.string().valid("active", "inactive").default("active"),
    owner: Joi.string(),
    memberList: Joi.array().items(Joi.string()),                    // Array of member IDs
    itemList: Joi.array().items(shoppingListItemValidationSchema), // Array of validated shopping list items
    isDone: Joi.boolean().default(false),
    isArchived: Joi.boolean().default(false),
});
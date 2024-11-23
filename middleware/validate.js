const {shoppingListValidationSchema, shoppingListItemValidationSchema} = require("../validators/validationSchemas")

const validateShoppingList = (req, res, next) => {
  const { error } = shoppingListValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: "Validation error",
      details: error.details.map((err) => err.message)
    });
  }
  next();
};

const validateShoppingListItem = (req, res, next) => {
  const { error } = shoppingListItemValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: "Validation error",
      details: error.details.map((err) => err.message)
    });
  }
  next();
};

module.exports = {validateShoppingList,validateShoppingListItem}
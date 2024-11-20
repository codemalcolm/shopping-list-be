const authorizeOwner = (req, res, next) => {
    const userId = req.user.id; // Assuming user is attached to req after authentication
    const { owner } = req.body;
  
    if (userId !== owner) {
      return res.status(403).json({
        error: "Authorization error",
        message: "You are not authorized to perform this action."
      });
    }
    next();
  };

module.exports = {authorizeOwner}
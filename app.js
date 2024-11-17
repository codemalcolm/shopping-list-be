const express = require("express");
const app = express();
const shoppingLists = require("./routes/shoppingLists")

const port = 3000;

app.get("/", (req, res)=> {
    res.send("Hello World")
})

// routes
app.use("/shoppinglist", shoppingLists)


app.listen(port, () => {
	console.log(`Server is started on http://localhost:${port}`);
});

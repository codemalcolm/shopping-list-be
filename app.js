const express = require("express");
const app = express();
const shoppingLists = require("./routes/shoppingLists");
const connectDB = require("./db/connect");
require("dotenv").config()

app.use(express.json()); // Parse JSON bodies

app.get("/", (req, res) => {
    res.send("Hello World");
});

// routes
app.use("/shoppinglist", shoppingLists);

const port = 3000;

const start = async () => {
	try {
		// mongo connection
		await connectDB(process.env.MONGO_URI); // Connecting to DB

		// port listening
		app.listen(port, () => {
			console.log(`Server is started on http://localhost:${port}`);
		});
	} catch (error) {}
};

start();

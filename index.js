const express = require("express");
const {json} = require("body-parser");
const cors = require("cors");
const massive = require("massive");
require('dotenv').config()

const {dbUser, dbPass, database} = require("./config");
const products_controller = require("./products_controller");
// const usersCtrl = require("./usersCtrl");

const port = process.env.PORT || 3000;
const connectionString = `postgres://${dbUser}:${dbPass}@localhost/${database}`;

const app = express();

app.use(json());
app.use(cors());

const massiveConnection = massive(connectionString)
	.then(db => {
		app.set("db", db);
	})
	.catch(err => {
		console.log(err);
	});

app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id", products_controller.update);
app.post("/api/product", products_controller.create);
app.delete("/api/product/:id", products_controller.delete);









app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
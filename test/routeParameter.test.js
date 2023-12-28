import express from "express";
import supertest from "supertest";

const app = express();

app.get("/product/:id", (req, res) => {
	res.send(`product: ${req.params.id}`);
})
app.get("/categories/:id(\\d", (req, res) => {
	res.send(`categories: ${req.params.id}`);
})

test("test query param", async () => {
	
})
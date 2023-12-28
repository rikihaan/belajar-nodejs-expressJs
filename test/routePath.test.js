import express from "express";
import supertest from "supertest";

const app = express();
app.get("/product/*.json", (req, res) => {
	res.send(req.originalUrl);
})

app.get("/categories/*\\d+", (req, res) => {
	res.send(req.originalUrl);
})

test("Test route path", async () => {
	let response = await supertest(app).get("/product/asep.json");
	expect(response.text).toBe("/product/asep.json");

	response = await supertest(app).get("/product/riki.json");
	expect(response.text).toBe("/product/riki.json");

	response = await supertest(app).get("/categories/2341");
	expect(response.text).toBe("/categories/2341")

	response = await supertest(app).get("/categories/salah");
	expect(response.status).toBe(404);
})
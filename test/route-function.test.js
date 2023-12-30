import express from "express";
import supertest from "supertest";

const app = express();
app.route("/products")
	.get((req, res) => {
		res.send("Get Product");
	})
	.post((req, res) => {
		res.send("Create Product");
	}).put((req, res) => {
		res.send("Update Product");
	});

test("Route Function", async () => {
	let response = await supertest(app).get("/Products");
	expect(response.text).toBe("Get Product")

	response = await supertest(app).post("/Products");
	expect(response.text).toBe("Create Product");

	response = await supertest(app).put("/Products");
	expect(response.text).toBe("Update Product")
})
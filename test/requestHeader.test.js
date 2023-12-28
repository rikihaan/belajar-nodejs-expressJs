import express from "express";
import supertest from "supertest";

test("test request header", async () => {
	const app = express();
	app.get("/", (req, res) => {
		const type = req.get("Accept");
		res.send(`Hello ${type}`)
	})

	const response = await supertest(app).get("/").set("Accept", "text/plain");
	expect(response.text).toBe("Hello text/plain");
})
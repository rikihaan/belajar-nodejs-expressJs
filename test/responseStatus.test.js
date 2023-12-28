import express from "express";
import supertest from "supertest";

test("test response status", async () => {
	const app = express();
	app.get("/", (req, res) => {
		if (req.query.name) {
			res.status(200).send(`Hello ${req.query.name}`);
		} else {
			res.status(400).end();

		}
	})

	let response = await supertest(app).get("/").query({ name: "Asep" });
	expect(response.text).toBe("Hello Asep");
	expect(response.status).toBe(200)

	response = await supertest(app).get("/");
	expect(response.status).toBe(400)
})
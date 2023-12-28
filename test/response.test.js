import express from "express";
import supertest from "supertest";

test("test Response", async () => {
	const app = express();
	app.get("/", (req, res) => {
		res.send("Hello Response");
	})

	const response = await supertest(app).get("/");
	expect(response.text).toBe("Hello Response");
})




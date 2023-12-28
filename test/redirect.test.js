import express from "express";
import supertest from "supertest";

test("Response redirect", async () => {
	const app = express();
	app.get("/", (req, res) => {
		res.redirect("/to-next-page")
	})

	const response = await supertest(app).get("/");
	expect(response.status).toBe(302);
	expect(response.get("Location")).toBe("/to-next-page");
})
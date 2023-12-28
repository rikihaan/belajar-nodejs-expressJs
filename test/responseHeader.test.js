import express from 'express';
import supertest from 'supertest';

test("Response Header", async () => {
	const app = express();
	app.get("/", (req, res) => {
		res.set({
			'X-Powered-By': 'Titip Informatika',
			'X-Author': 'Asep Riki'
		}).end();
	})

	const response = await supertest(app).get("/");

	expect(response.get("X-Powered-By")).toBe("Titip Informatika");
	expect(response.get("X-Author")).toBe("Asep Riki");
})
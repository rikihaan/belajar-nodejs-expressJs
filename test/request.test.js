import express  from 'express';
import supertest from 'supertest';


test("test Request", async () => {
	const app = express();
	app.get("/", (req, res) => {
		res.send(`Hello ${req.query.name}`);
	})


	const response = await supertest(app).get("/").query({ name: "World" });
	expect(response.text).toBe("Hello World");
})
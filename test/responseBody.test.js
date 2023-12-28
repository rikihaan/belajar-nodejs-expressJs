import express, { request } from 'express';
import supertest from 'supertest';

test("Response Body", async () => {
	const app = express();
	app.get('/', (req, res) => {
		res.set("Content-Type", "text/html");
		res.send(`<html><head><title>Hello HTML</title></head></html>`)
	})

	const response = await supertest(app).get("/");

	expect(response.get("Content-Type")).toContain("text/html");
	expect(response.text).toBe('<html><head><title>Hello HTML</title></head></html>')
})



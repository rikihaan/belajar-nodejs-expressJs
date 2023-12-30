import express, { response } from "express";
import supertest from "supertest";

const app = express();


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/contoh.txt");
})

test("Test response sendFile", async () => {
	const response = await supertest(app).get("/");
	expect(response.text).toContain("This is sample text");
})
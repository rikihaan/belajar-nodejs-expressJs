import express from "express";
import supertest from "supertest"; 

test("test Query Param", async () => {
	const app = express();
	app.get("/", (req, res) => {
		res.send(`Hello ${req.query.firstName} ${req.query.lastName}`)
	})

	const response = await supertest(app)
		.get("/").query({
			firstName: "Asep",
			lastName: "Riki"
		});
	
	expect(response.text).toBe("Hello Asep Riki")
})
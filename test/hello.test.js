import  express  from "express";
import request  from "supertest";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
})

test("Test Request with supertest", async () => {
	const respon = await request(app).get("/");
	expect(respon.text).toBe("Hello World")
})
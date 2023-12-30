import cookieParser from "cookie-parser";
import express from "express";
import supertest from "supertest";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
	const name = req.cookies.name;
	res.send(`Hello ${name}`);
})
app.post("/login", (req, res) => {
	const name = req.body.name;
	res.cookie("Login", name, { path: '/' });
	res.send(`Hello ${name}`)
})


test("Test Get Cookie", async () => {
	const response = await supertest(app).get("/")
		.set("Cookie", "name=Riki;author=TitipInformatika");
	expect(response.text).toBe("Hello Riki");
})

test("Test Write Cookie", async () => {
	const response = await supertest(app).post("/login").send({ name: "AsepRiki" });
	expect(response.get('Set-Cookie').toString()).toContain("AsepRiki");
	expect(response.text).toBe("Hello AsepRiki")
})
import cookieParser from "cookie-parser";
import express from "express";
import supertest from "supertest";

const app = express();

app.use(express.json());
app.use(cookieParser("Rahsiaheuy2"));

app.get("/", (req, res) => {
	const name = req.signedCookies["Login"];
	console.info(name);
	res.send(`Hello ${name}`);
})

app.post("/login", (req, res) => {
	const name = req.body.name;
	res.cookie("Login", name, { path: "/", signed: true });
	res.send(`Hello ${name}`);
})

test("Test Cookie-Signed Read", async () => {
	const response = await supertest(app).get("/")
		.set("Cookie", "Login=s%3ARiki.VcBWoayg8P92OugE6lwAw2O6eAj8YgP148RRfQbAvxs; Path=/");
	expect(response.text).toBe("Hello Riki")
})
test("Test Cookie-Signed Create", async () => {
	const response = await supertest(app).post("/login").send({ name: "Riki" });
	console.info(response.get("Set-Cookie"));
	expect(response.get("Set-Cookie").toString()).toContain("Riki")
	expect(response.text).toBe("Hello Riki")
})
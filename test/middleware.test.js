import express from "express";
import supertest from "supertest";

const app = express();
// membuat middleware
const logger = (req, res, next) => {
	console.info(`Receive request: ${req.method} ${req.originalUrl}`);
	next();
}

const addPoweredHeader = (req, res, next) => {
	res.set("X-Powered-By", "Titip Informatika");
	next()
}

const apiKeyMiddleware = (req, res, next) => {
	if (req.query.apiKey) {
		next();
	} else {
		res.status(401).end();
	}
}

//middleware request time
const requestTimeMiddleware = (req, res, next) => {
	req.requestTime = Date.now();
	next();
}


// menggunakan/menambahkan middleware (harus sesuai execution)
	app.use(logger);
	app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);
	app.get("/", (req, res) => {
		res.send("Hello Response");
	})

	app.get("/riki", (req, res) => {
		res.send("Hello Riki");
	})

	app.get("/login", (req, res) => {
		res.send("Hello Login");
	})

	app.get("/time", (req, res) => {
		res.send(`today is: ${req.requestTime}`).end()
	})
test("Test Middleware 1", async () => {
	const response = await supertest(app).get("/").query({apiKey:"1234"});
	expect(response.get("X-Powered-By")).toBe("Titip Informatika")
	expect(response.text).toBe("Hello Response");
	
})

test("Test Middleware 2", async () => {
	const response = await supertest(app).get("/riki").query({apiKey:"1234"});
	expect(response.get("X-Powered-By")).toBe("Titip Informatika")
	expect(response.text).toBe("Hello Riki");
})

test("Test Middleware Unauthoriz", async () => {
	const response = await supertest(app).get("/login");
	expect(response.status).toBe(401)
})

test("Test Middleware Time Middleware", async () => {
	const response = await supertest(app).get("/time").query({apiKey:"1234"});
	expect(response.text).toContain("today is: 1")
})
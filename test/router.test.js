import express from "express";
import request from "supertest";

const app = express();
const router = express.Router();

// menambahkan middleware 
router.use((req, res, next) => {
	console.info(`Recive request: ${req.originalUrl}`);
	next();
})

router.get("/feature/a", (req, res) => {
	res.send("feature A");
})

test("Test Feature A router disables", async () => {
	const response = await request(app).get("/feature/a");
	expect(response.status).toBe(404);
})


test("Test Feature A router Enable", async () => {
	app.use(router)
	const response = await request(app).get("/feature/a");
	expect(response.text).toBe("feature A");
})

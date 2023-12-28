import express from 'express';

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World")
})
app.get("/login", (req, res) => {
	res.send("Hello login")
})

app.get("/about", (req, res) => {
	res.send("Hello about")
})



app.listen(3000, () => {
	console.info("server started from port 3000")
})
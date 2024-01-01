import express from "express";
import supertest from "supertest";
import expressFileUpload from "express-fileupload"

const app = express();
app.use(expressFileUpload())

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/contoh.txt");
})

app.post("/",async(req,res)=>{
	const textFile = req.files.article;
	await textFile.mv(__dirname+"/upload/"+textFile.name);
	res.send(`Hello ${req.body.name} your upload ${textFile.name}`)
})

test("Test response sendFile", async () => {
	const response = await supertest(app).get("/");
	expect(response.text).toContain("This is sample text");
})

test("Test Upload",async()=>{
	const response = await supertest(app).post("/")
	.field('name',"Asep")
	.attach("article",__dirname+"/contoh.txt");
	expect(response.text).toBe("Hello Asep your upload contoh.txt")
})
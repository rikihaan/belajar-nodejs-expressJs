import express from "express";
import mustacheExpress from "mustache-express";
import supertest from "supertest";

const app = express();
app.set("views",__dirname + "/views");
app.set("view engine","html");
app.engine("html",mustacheExpress());

app.get("/",(req,res)=>{
    res.render("index",{
        title:"Hello World",
        say:'this is a test'
    })
})


test("Test template",async()=>{
    const response = await supertest(app).get("/");
    expect(response.text).toContain("Hello World");
    expect(response.text).toContain("this is a test");
})
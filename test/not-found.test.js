import express from "express";
import supertest from "supertest";

const app = express();
app.get("/",(req,res)=>{
    res.send("Hello Response");

})

app.use((req,res,next)=>{
    res.status(404).send("404 Not Found Euy");
})

test("Test  Found",async()=>{
    const response = await supertest(app).get("/");
    expect(response.text).toBe("Hello Response");


})

test("Test Not Found",async()=>{
    const response = await supertest(app).get("/salah");
    expect(response.status).toBe(404);
    expect(response.text).toBe("404 Not Found Euy");
})
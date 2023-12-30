import express from "express";
import supertest from "supertest";

const app = express();

// without prefix
// app.use(express.static(__dirname+"/static"));

// with prefix
app.use("/static",express.static(__dirname +"/static"))

app.get("/",(req,res)=>{
    res.send("Hello Response");
})

// membuat route yang mengarah ke file, maka aka tetap mengakses ke static file nya, jadi saat menggunkan static file hidari menggunakan nama route yang sama dengan file yang ada di static file
app.get("/contoh.txt",(req,res)=>{
    res.send("Hello Response this is from route not static file")
})

test("Test non Static file",async()=>{
    const response = await supertest(app).get("/");
    expect(response.text).toBe("Hello Response");
})



test("Test Read Static file",async()=>{
    const response = await supertest(app).get("/static/contoh.txt");
    expect(response.text).toContain("This is sample text");
})

test("Test access route file name same with static file",async()=>{
    const response = await supertest(app).get("/contoh.txt");
    expect(response.text).toContain("Hello Response this is from route not static file")
})

test("Test static file second file", async()=>{
    const response = await supertest(app).get("/static/contoh2.txt");
    expect(response.text).toContain("This is sample second text")
})
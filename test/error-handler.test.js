import express from "express";
import supertest from "supertest";

const app = express();
const errorMiddleware = (err,req,res,next)=>{
    res.status(500).send(`Terjadi Error: ${err.message}`);
}

app.get("/",(req,res)=>{
    throw new Error("Ups");
})

app.use(errorMiddleware); // tempatkan diposisi paling bawah di antara router

test("Test error handler",async()=>{
    const response = await supertest(app).get("/");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Terjadi Error: Ups")
})


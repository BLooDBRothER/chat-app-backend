import express, { Request, Response } from "express";
import { config } from "dotenv";
import initializeFirebase from "./config/firebase";

config();

initializeFirebase();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_: Request, res: Response) => {
    res.send("Hello world");
})

app.listen(port, () => {
    console.log(`[Info]: Server running at http://localhost:${port}`);
});

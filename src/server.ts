import express, { Request, Response } from "express";
import { config } from "dotenv";
import initializeFirebase from "./config/firebase";
import RabbitMQ from "./config/rabbitMq";
import authorizationMiddleware from "./middleware/authMiddleware";

config();

initializeFirebase();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.use(authorizationMiddleware)

app.get("/api", async (_: Request, res: Response) => {
    await RabbitMQ();
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`[Info]: Server running at http://localhost:${port}`);
});

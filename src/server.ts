import express, { Request, Response } from "express";
import { config } from "dotenv";
import initializeFirebase from "@/config/firebase";
import rabbitMq from "@/config/rabbitMq";
import authorizationMiddleware from "@/middleware/authMiddleware";

import createGroupNotificationRouter from "@/notification/group/router/createGroup"

config();

initializeFirebase();
rabbitMq.initConnection();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.use(authorizationMiddleware)

app.get("/", async (_: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api/notification", createGroupNotificationRouter);

app.listen(port, () => {
    console.log(`[Info]: Server | running at http://localhost:${port}`);
});

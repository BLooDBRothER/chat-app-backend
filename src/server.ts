import express, { Request, Response } from "express";
import { config } from "dotenv";
import initializeFirebase from "@/config/firebase";
import authorizationMiddleware from "@/middleware/authMiddleware";

import createGroupNotificationRouter from "@/notification/group/router/groups"
import rabbitMq from "@/rabbitMq/rabbitMq";

config();

initializeFirebase();
rabbitMq.initConnection();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(authorizationMiddleware)

app.get("/", async (_: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api/notification/groups", createGroupNotificationRouter);

app.listen(port, () => {
    console.log(`[Info]: Server | running at http://localhost:${port}`);
});

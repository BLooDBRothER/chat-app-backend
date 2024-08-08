import express, { Request, Response } from "express";
import { config } from "dotenv";
import authorizationMiddleware from "@/middleware/authMiddleware";

import createGroupNotificationRouter from "@/notification/group/router/groups"
import rabbitMq from "@/rabbitMq/rabbitMq";

config();

rabbitMq.initConnection();

const app = express();
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || 'localhost';

app.use(express.json());

// app.use(authorizationMiddleware)

app.get("/", async (_: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api/notification/groups", createGroupNotificationRouter);


app.listen(port, host, () => {
    console.log(`[Info]: Server | running at http://localhost:${port}`);
});

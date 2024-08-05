import express from "express";
import { triggerCreateGroupNotification } from "../controller/createGroup";

const router = express.Router();

router.get("/create/:groupId", triggerCreateGroupNotification);

export default router;

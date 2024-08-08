import express from "express";
import GroupNotificationController from "../controller/createGroup";

const router = express.Router();
const groupNotificationController = GroupNotificationController();

router.post("/create/:groupId", groupNotificationController.triggerCreateGroupNotification);

router.post("/request-accept/:groupId", groupNotificationController.triggerAcceptGroupNotification);

export default router;

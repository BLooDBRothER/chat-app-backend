import { Request, Response } from "express";
import { firestore } from "firebase-admin";
import rabbitMq from "@/rabbitMq/rabbitMq";
import SERVICE_ERROR from "@/error/serviceErrorCode";
import GroupType from "@/model/group";


export const triggerCreateGroupNotification = async (req: Request, res: Response) => {
    const { groupId } = req.params;

    const groupDocument = await firestore().collection("groups").doc(groupId).get();

    if(!groupDocument.exists) {
        return res.status(SERVICE_ERROR.GROUP.NO_GROUP_FOUND.status).json(SERVICE_ERROR.GROUP.NO_GROUP_FOUND);
    }

    const groupData = groupDocument.data() as GroupType;

    if(groupData.isNotificationTriggered) {
        return res.status(SERVICE_ERROR.NOTIFICATION.NOTIFICATION_TRIGGERED.status).json(SERVICE_ERROR.NOTIFICATION.NOTIFICATION_TRIGGERED);
    }

    const payload = {
        groupId
    }

    rabbitMq.sendMessage(rabbitMq.QUEUE.GROUP_CREATE, payload);

    firestore().collection("groups").doc(groupId).update({
        "isNotificationTriggered": true,
        "updatedAt": new Date()
    })

    return res.json({
        "message": "Notification Triggered"
    })
}

import { Request, Response } from "express";
import firestore from "firebase-admin";
import rabbitMq from "@/rabbitMq/rabbitMq";
import SERVICE_ERROR from "@/error/serviceErrorCode";
import GroupType from "@/model/group";
import { NotificationType } from "@/model/notification";
import firebaseApp from "@/config/firebase";

const GroupNotificationController = () => {
    const _db = firebaseApp.firestore();

    const triggerCreateGroupNotification = async (req: Request, res: Response) => {
        const { groupId } = req.params;
    
        const groupDocument = await _db.collection("groups").doc(groupId).get();
        if(!groupDocument.exists) {
            return res.status(SERVICE_ERROR.GROUP.NO_GROUP_FOUND.status).json(SERVICE_ERROR.GROUP.NO_GROUP_FOUND);
        }

        const groupNotificationDocument = await _db.collection("notifications").doc(groupId).get();
        if(groupNotificationDocument.exists) {
            return res.status(SERVICE_ERROR.NOTIFICATION.NOTIFICATION_TRIGGERED.status).json(SERVICE_ERROR.NOTIFICATION.NOTIFICATION_TRIGGERED);
        }
    
        const payload = {
            groupId
        };

        console.log(`[Info]: RabbitMQ | Publishing to queue ${rabbitMq.QUEUE.GROUP_CREATE} | ${JSON.stringify(payload)}`);
    
        rabbitMq.sendMessage(rabbitMq.QUEUE.GROUP_CREATE, payload);

        _db.collection("notifications").doc(groupId).set({
            createGroupTriggered: true,
            userAcceptTriggered: {},
            createdAt: firestore.firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.firestore.FieldValue.serverTimestamp(),
        });
    
        return res.json({
            "message": "Notification Triggered"
        });
    }

    const triggerAcceptGroupNotification = async (req: Request, res: Response) => {
        const { groupId } = req.params;
        const { acceptedUserId } = req.body;
    
        const groupDocument = await _db.collection("groups").doc(groupId).get();
    
        if(!groupDocument.exists) {
            return res.status(SERVICE_ERROR.GROUP.NO_GROUP_FOUND.status).json(SERVICE_ERROR.GROUP.NO_GROUP_FOUND);
        }
        const groupData = groupDocument.data() as GroupType;
        if(!groupData.users.some(userId => userId === acceptedUserId)) {
            return res.status(SERVICE_ERROR.USER.NO_USER_FOUND.status).json(SERVICE_ERROR.USER.NO_USER_FOUND);
        }

        const groupNotificationDocument = await _db.collection("notifications").doc(groupId).get();

        if(!groupNotificationDocument.exists) {
            return res.status(SERVICE_ERROR.ALL.INVALID_REQUEST.status).json(SERVICE_ERROR.ALL.INVALID_REQUEST);
        }

        const groupNotificationData = groupNotificationDocument.data() as NotificationType;
        if(groupNotificationData.userAcceptTriggered[acceptedUserId]) {
            return res.status(SERVICE_ERROR.NOTIFICATION.NOTIFICATION_TRIGGERED.status).json(SERVICE_ERROR.NOTIFICATION.NOTIFICATION_TRIGGERED);
        }
    
        const payload = {
            groupId,
            userId: acceptedUserId
        }

        console.log(`[Info]: RabbitMQ | Publishing to queue ${rabbitMq.QUEUE.USER_GROUP_ACCEPT} | ${JSON.stringify(payload)}`);
    
        rabbitMq.sendMessage(rabbitMq.QUEUE.USER_GROUP_ACCEPT, payload);
    
        const userKey = `userAcceptTriggered.${acceptedUserId}`;
        _db.collection("notifications").doc(groupId).update({
            [userKey]: true,
            updatedAt: firestore.firestore.FieldValue.serverTimestamp(),
        });
    
        return res.json({
            "message": "Notification Triggered"
        });
    }

    return { triggerCreateGroupNotification, triggerAcceptGroupNotification };
}

export default GroupNotificationController;

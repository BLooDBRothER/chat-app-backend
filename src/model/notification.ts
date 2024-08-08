export type NotificationType = {
    createGroupTriggered: boolean
    userAcceptTriggered: {
        [userId: string]: boolean
    }
    createdAt: Date
    updatedAt: Date
}

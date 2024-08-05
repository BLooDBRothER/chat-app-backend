const errorPayload = (status:number, message: string) => ({
    status,
    message
});

const SERVICE_ERROR = {
    USER: {
        NOT_AUTHENTICATED: errorPayload(401, "Please Login!"),
    },
    GROUP: {
        NO_GROUP_FOUND: errorPayload(404, "No Group Found"),
    },
    NOTIFICATION: {
        NOTIFICATION_TRIGGERED: errorPayload(400, "Notification Already Triggered")
    }
};

export default SERVICE_ERROR;
